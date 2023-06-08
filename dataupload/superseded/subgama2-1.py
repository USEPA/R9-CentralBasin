# subgama2-1.py
# The pythons script below is designed to sub set given chemicals and calculate elevations for the GAMA data set
# "D:\Program Files\ArcGIS\Pro\bin\Python\envs\arcgispro-py3\python.exe" subgama2-1.py
# D:\R9Data\CentralBasin3D\Gama
# Purpose: Create wells layer with Elevation at Top and Bottom of Well
import arcpy, time, sys, os

# Start timer
start = time.time()

# Set the current workspace 
arcpy.env.workspace = "D:/R9Data/CentralBasin3D/Gama/gama.gdb"


# ---------------------------------------
# The below is the subset function
# ---------------------------------------

def subset(chemical,legend1, legend2, legend3, legend4):

	# +++++++++++++++++++++++++++++++++++++++++
	# Create subset of well for given chemical
	# +++++++++++++++++++++++++++++++++++++++++

	primaryfc = "gama_all_losangeles2020_05_06WM2"
	basefcname = "Gama"

	outfc = basefcname + chemical
	if arcpy.Exists(outfc):
		arcpy.Delete_management(outfc)
	whereclause = '"CHEMICAL" = \'' + (chemical) + "'"
	print (whereclause)
	arcpy.Select_analysis(primaryfc, outfc, whereclause)
	
	outfc2 = basefcname + chemical + "clp"
	if arcpy.Exists(outfc2):
		arcpy.Delete_management(outfc2)
	
	arcpy.Clip_analysis(outfc, r"D:\R9Data\CentralBasin3D\BasinOutlineKML\BasinsWM.gdb\CentralBasinBoundaryWM", outfc2)
	
	if arcpy.Exists(outfc):
		arcpy.Delete_management(outfc)

	joinedWellsFc = outfc2

	# +++++++++++++++++++++++++++++++++++
	# Run FC through DEM for elevation of well
	# +++++++++++++++++++++++++++++++++++
	dem = "D:/R9Data/CentralBasin3D/DEM/DemCentralBasinWM.gdb/CentralBasinMosaicDEM"   # USGS DEM

	joinedWellsWithZ = "Gama" + chemical + "WellsRanThroughDEM" + "clp"
	if arcpy.Exists(joinedWellsWithZ):
		arcpy.Delete_management(joinedWellsWithZ)

	arcpy.ddd.InterpolateShape(dem, joinedWellsFc, joinedWellsWithZ, None, 1, "BILINEAR", "DENSIFY", 0, "EXCLUDE")
	arcpy.Delete_management(joinedWellsFc)

	# +++++++++++++++++++++++++++++++++++
	# Add attribute for elevation in feet and calcuate
	# +++++++++++++++++++++++++++++++++++
	arcpy.ddd.AddZInformation(joinedWellsWithZ, "Z", '')
	arcpy.AddField_management(joinedWellsWithZ, "ZinFeet", "DOUBLE", 9, "", "", "Elevation at Top of Well in Feet")
	arcpy.CalculateField_management(joinedWellsWithZ, "ZinFeet", "$feature.Z * 3.28", "ARCADE")

	# +++++++++++++++++++++++++++++++++++
	# Add attribute for bottom of well elevation in feet and calcuate based on WELL_DEPTH__FT_ 
	# +++++++++++++++++++++++++++++++++++
	arcpy.AddField_management(joinedWellsWithZ, "ElevationBottomOfWellFeet", "DOUBLE", 9, "", "")
	arcpy.AddField_management(joinedWellsWithZ, "BottomCalcMethod", "TEXT", 200, "", "", "Method used to determine bottom of well elevation")
	arcpy.CalculateField_management(joinedWellsWithZ, "BottomCalcMethod", "\"Created directly using Well Depth Ft Field\"", "PYTHON3")
	arcpy.CalculateField_management(joinedWellsWithZ, "ElevationBottomOfWellFeet", "$feature.ZinFeet - $feature.WELL_DEPTH__FT_", "ARCADE")
	arcpy.AddField_management(joinedWellsWithZ, "BufferDistance", "DOUBLE", 9, "", "")
	
	# +++++++++++++++++++++++++++++++++++
	# Remove data that doesnt have any of the feature to tell us depth
	# +++++++++++++++++++++++++++++++++++
	fc = joinedWellsWithZ
	fields = ['WELL_DEPTH__FT_', 'TOP_OF_SCREEN__FT_', 'SCREEN_LENGTH__FT_', 'ElevationBottomOfWellFeet']
	count = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the well WellDepthFt and look for nulls
	    for row in cursor:
	        if ((row[0] == None ) and (row[1] == None ) and (row[2] == None )):
	            #row[3] = 8888
	            cursor.deleteRow()
	            count = count + 1
	print ("This many were all blank for elevations: " + str(count))
	
	
	#  Likely can delete this section with the update of the download being fixed
	# +++++++++++++++++++++++++++++++++++
	# Remove data that has TOP_OF_SCREEN__FT_ = 2,061,584,302 and SCREEN_LENGTH__FT_ = 343597384
	# +++++++++++++++++++++++++++++++++++
	fc = joinedWellsWithZ
	fields = ['WELL_DEPTH__FT_', 'TOP_OF_SCREEN__FT_', 'SCREEN_LENGTH__FT_', 'ElevationBottomOfWellFeet']
	count = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the well WellDepthFt and look for nulls
	    for row in cursor:
	        if ((row[1] == 2061584302 ) and (row[2] == 343597384 )):
	            #row[3] = 8888
	            cursor.deleteRow()
	            count = count + 1
	print ("This many were all blank for elevations: " + str(count))
	
	# +++++++++++++++++++++++++++++++++++
	# Remove WRD, USGS, DHS Data since we have it in WRD dataset
	# +++++++++++++++++++++++++++++++++++
	fc = joinedWellsWithZ
	fields = ['SOURCE']
	count = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the well WellDepthFt and look for nulls
	    for row in cursor:
	        if ((row[0] == "WRD") or (row[0] == "DHS") or (row[0] == "USGS")):
	            cursor.deleteRow()
	            count = count + 1
	print ("This many had WRD, DHS, or USGS as source: " + str(count))	

	
	# +++++++++++++++++++++++++++++++++++
	# Flag data that doesn't have good elevations for bottom of well
	# +++++++++++++++++++++++++++++++++++
	fc = joinedWellsWithZ
	fields = ['WELL_DEPTH__FT_', 'ElevationBottomOfWellFeet']
	count = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the well WellDepthFt and look for nulls
	    for row in cursor:
	        if (row[0] == None ):
	            row[1] = 9999
	            count = count + 1
	        # Update the cursor with the updated list
	        cursor.updateRow(row)
	print ("This many didn't have elevations: " + str(count))
	
	
	# +++++++++++++++++++++++++++++++++++
	# Populate well depth by using screen
	# +++++++++++++++++++++++++++++++++++
	fc = joinedWellsWithZ
	# why is the 3rd one on the string on twice??
	fields = ['TOP_OF_SCREEN__FT_', 'ElevationBottomOfWellFeet', 'SCREEN_LENGTH__FT_', 'ZinFeet', 'BottomCalcMethod']
	count2 = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the well PerfsAndAquifersSummary_Max_BOI
	    for row in cursor:
	        if ((row[1] == 9999) and (row[0] != None)):
	           #row[1] = row[3] - (row[0] + row[2])
	           row3 = row[3]
	           #print("Row3 ZinFeet: " + str(row3))
	           row0 = row[0]
	           #print("Row0 TopOfScreen: " + str(row0))
	           row2 = row[2]
	           #print("Row2 ElevationBottomOfWell: " + str(row2))
	           if ((row[2] != None)):
	              welldepth = row3 - (row0 + row2)
	              #print (welldepth)
	              row[1] = welldepth
	              row[4] = "Calculated based on screen length and top of screen"
	              count2 = count2 + 1
	              #print ("Count " + str(count2))
	           #if ((row[2] == None) and (row[0] > 1)):
	              #welldepth = row3 - row2
	              #print (str(welldepth))
	              #row[1] = welldepth
	              #row[4] = "Calculated based on top of screen"
	              #count2 = count2 + 1
	              #print ("Count " + str(count2))
	        # Update the cursor with the updated list
	        cursor.updateRow(row)
	print ("This many were calculated form the BOP of WRD orginal data minus the elevations from USGS DEM: " + str(count2))
	
	# +++++++++++++++++++++++++++++++++++
	# Populate well depth by using screen length ft
	# +++++++++++++++++++++++++++++++++++
	fc = joinedWellsWithZ
	# why is the 3rd one on the string on twice??
	fields = ['TOP_OF_SCREEN__FT_', 'ElevationBottomOfWellFeet', 'SCREEN_LENGTH__FT_', 'ZinFeet', 'BottomCalcMethod']
	count2 = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the well PerfsAndAquifersSummary_Max_BOI
	    for row in cursor:
	        if ((row[1] == 9999) and (row[2] != None) and (row[2] > 1)):
	           row3 = row[3]
	           #print("Row3 ZinFeet: " + str(row3))
	           row0 = row[0]
	           #print("Row0 TOP_OF_SCREEN__FT_: " + str(row0))
	           row2 = row[2]
	           #print("Row2 SCREEN_LENGTH__FT_: " + str(row2))
	           row4 = row[4]
	           #print("Row4 TopOfScreen: " + str(row0))
	           welldepth = row3 - row2
	           row[1] = welldepth
	           row[4] = "Calculated based on screen length"
	        # Update the cursor with the updated list
	        cursor.updateRow(row)
	           
	# +++++++++++++++++++++++++++++++++++
	# Populate well depth by using top of screen 
	# +++++++++++++++++++++++++++++++++++
	fc = joinedWellsWithZ
	# why is the 3rd one on the string on twice??
	fields = ['TOP_OF_SCREEN__FT_', 'ElevationBottomOfWellFeet', 'SCREEN_LENGTH__FT_', 'ZinFeet', 'BottomCalcMethod']
	count2 = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the well PerfsAndAquifersSummary_Max_BOI
	    for row in cursor:
	        if ((row[1] == 9999) and (row[0] > 1)):
	           row3 = row[3]
	           #print("Row3 ZinFeet: " + str(row3))
	           row0 = row[0]
	           #print("Row0 TOP_OF_SCREEN__FT_: " + str(row0))
	           row2 = row[2]
	           #print("Row2 SCREEN_LENGTH__FT_: " + str(row2))
	           row4 = row[4]
	           #print("Row4 TopOfScreen: " + str(row0))
	           welldepth = row3 - row0
	           row[1] = welldepth
	           row[4] = "Calculated based on top of screen"
	        # Update the cursor with the updated list
	        cursor.updateRow(row)
	
	# +++++++++++++++++++++++++++++++++++
	# Populate well buffer value
	# +++++++++++++++++++++++++++++++++++
	fc = joinedWellsWithZ
	fields = ['RESULTS', 'BufferDistance']
	count3 = 0
	count4 = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the results field to determine the buffer
	    for row in cursor:
	        if ((row[0] < legend1)):
	           row[1] = 9	           
	        if ((row[0] > legend1) and (row[0] < legend2) ):
	           row[1] = 10
	        if ((row[0] > legend2) and (row[0] < legend3) ):
	           row[1] = 11
	        if ((row[0] > legend3) and (row[0] < legend4) ):
	           row[1] = 12
	        if ((row[0] > legend4)):
	           row[1] = 13
	           
	        # Update the cursor with the updated list
	        cursor.updateRow(row)
	#print ("This many were below 5: " + str(count3))	
	
	
	fcbuf = fc + "buf"
	if arcpy.Exists(fcbuf):
		arcpy.Delete_management(fcbuf)
	
	arcpy.Buffer_analysis(fc, fcbuf, "BufferDistance", "FULL", "ROUND")
	
# ---------------------------------------
# The above is the subset function
# ---------------------------------------

chemical = "PCE"
#legend1 = 0.5
#legend2 = 5
#legend3 = 10
#legend4 = 15

legend1 = 0.5
legend2 = 5
legend3 = 25
legend4 = 50

#subset(chemical,legend1,legend2,legend3,legend4)
chemical = "TCE"
#subset(chemical,legend1,legend2,legend3,legend4)


chemical = "CR6" #Hexavalent Chromium
#legend1 = 1
#legend2 = 5
#legend3 = 10
#legend4 = 15

legend1 = 1
legend2 = 10
legend3 = 100
legend4 = 200
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "CTCL" #Carbon Tetrachloride
chemAbr = "CTCL"
legend1 = 0.5
legend2 = 0.5
legend3 = 2.5
legend4 = 5
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "VC" #Vinyl chloride (VC)
chemAbr = "VC"
legend1 = 0.5
legend2 = 0.5
legend3 = 2.5
legend4 = 5
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "AS" #Arsenic
chemAbr = "AS"
legend1 = 2
legend2 = 10
legend3 = 50
legend4 = 100
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "PB" #Lead
chemAbr = "PB"
legend1 = 5
legend2 = 15
legend3 = 75
legend4 = 150
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "CR" #Total Chromium
chemAbr = "CR"
legend1 = 10
legend2 = 50
legend3 = 250
legend4 = 500
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "PFOS" #Perfluorooctanesulfonic Acid (PFOS)
chemAbr = "PFOS"
legend1 = 0.002
legend2 = 0.0065
legend3 = 0.0325
legend4 = 0.065
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "PFOA" #Perfuloroctanioic Acid (PFOA)
chemAbr = "PFOA"
legend1 = 0.002
legend2 = 0.0051
legend3 = 0.00255
legend4 = 0.051
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "DCE11" #1,1-Dichloroethylene 
chemAbr = "DCE11" #1,1-DCE
legend1 = 0.5
legend2 = 6
legend3 = 30
legend4 = 60
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "DIOXANE14" #1,4-Dioxane  #ask Matt
chemAbr = "DIOXANE14"  #C4H802
legend1 = 1
legend2 = 1
legend3 = 5
legend4 = 10
#subset(chemical,legend1,legend2,legend3,legend4)

chemical = "DCE12C" #cis-1,2-Dichloroethylene  #Brain fixed
chemAbr = "DCE12C" #cis-1,2-DCE
legend1 = 0.5
legend2 = 6
legend3 = 30
legend4 = 60
subset(chemical,legend1,legend2,legend3,legend4)

chemical = "TCPR123" #1,2,3-Trichloropropane  #Brian Fixed
chemAbr = "TCPR123"  #1,2,3-TCP
legend1 = 0.005
legend2 = 0.005
legend3 = 0.025
legend4 = 0.05
subset(chemical,legend1,legend2,legend3,legend4)

chemical = "PCATE" #Perchlorate #Brian Fixed
chemAbr = "PCATE"
legend1 = 4
legend2 = 6
legend3 = 30
legend4 = 60
subset(chemical,legend1,legend2,legend3,legend4)


print ("Made it to the End, Done!")
print('It took', time.time()-start, 'seconds.')
minutes = (time.time()-start)/60
print ("Minutes Ran " + str(minutes))
sys.exit()
# End of Code +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++