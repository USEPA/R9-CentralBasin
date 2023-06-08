# subgama3.py
# The pythons script below is designed to sub set given chemicals and calculate elevations for the GAMA data set
# "D:\Program Files\ArcGIS\Pro\bin\Python\envs\arcgispro-py3\python.exe" subgama3.py
# D:\R9Data\CentralBasin3D\2022Phase2\Gama
# Updates:
# Modified code to work with updates to data schema from GAMA on 10/25/2022
#
# Purpose: Create wells layer with Elevation at Top and Bottom of Well
import arcpy, time, sys, os

# Start timer
start = time.time()

# Set the current workspace 
arcpy.env.workspace = "D:/R9Data/CentralBasin3D/2022Phase2/Gama/output.gdb"

# ---------------------------------------
# The below is the subset function
# ---------------------------------------

def subset():

	# +++++++++++++++++++++++++++++++++++++++++
	# Create subset of well for given chemical
	# +++++++++++++++++++++++++++++++++++++++++

	primaryfc = "gamapt"
	basefcname = "Gama"

	outfc2 = primaryfc + "clp"
	if arcpy.Exists(outfc2):
		arcpy.Delete_management(outfc2)
	
	print ("Clipping the data")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")
	arcpy.Clip_analysis(primaryfc, "D:/R9Data/CentralBasin3D/2022Phase2/AncillaryData/AncillaryData.gdb/CentralBasinBoundaryWM", outfc2)

	joinedWellsFc = outfc2

	# +++++++++++++++++++++++++++++++++++
	# Run FC through DEM for elevation of well
	# +++++++++++++++++++++++++++++++++++
	dem = "D:/R9Data/CentralBasin3D/2022Phase2/AncillaryData/DemCentralBasinWM.gdb/CentralBasinMosaicDEM"   # USGS DEM

	joinedWellsWithZ = "Gama" + "WellsRanThroughDEM" + "clp"
	if arcpy.Exists(joinedWellsWithZ):
		arcpy.Delete_management(joinedWellsWithZ)
	print ("Interpolating DEM with wells")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")
	arcpy.ddd.InterpolateShape(dem, joinedWellsFc, joinedWellsWithZ, None, 1, "BILINEAR", "DENSIFY", 0, "EXCLUDE")
	#arcpy.Delete_management(joinedWellsFc)

	# +++++++++++++++++++++++++++++++++++
	# Add attribute for elevation in feet and calcuate
	# +++++++++++++++++++++++++++++++++++
	print ("Calculating Z into attribute table")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")
	arcpy.ddd.AddZInformation(joinedWellsWithZ, "Z", '')
	arcpy.AddField_management(joinedWellsWithZ, "ZinFeet", "DOUBLE", 9, "", "", "Elevation at Top of Well in Feet")
	arcpy.CalculateField_management(joinedWellsWithZ, "ZinFeet", "$feature.Z * 3.28", "ARCADE")

	# +++++++++++++++++++++++++++++++++++
	# Add attribute for bottom of well elevation in feet and calcuate based on WELL_DEPTH__FT_ 
	# +++++++++++++++++++++++++++++++++++
	print ("Add attribute for bottom of well elevation in feet and calculating")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")
	arcpy.AddField_management(joinedWellsWithZ, "ElevationBottomOfWellFeet", "DOUBLE", 9, "", "")
	arcpy.AddField_management(joinedWellsWithZ, "BottomCalcMethod", "TEXT", 200, "", "", "Method used to determine bottom of well elevation")
	arcpy.CalculateField_management(joinedWellsWithZ, "BottomCalcMethod", "\"Created directly using Well Depth Ft Field\"", "PYTHON3")
	arcpy.CalculateField_management(joinedWellsWithZ, "ElevationBottomOfWellFeet", "$feature.ZinFeet - $feature.GM_WELL_DEPTH_FT", "ARCADE")
	
	# +++++++++++++++++++++++++++++++++++
	# Remove data that doesnt have any of the feature to tell us depth
	# +++++++++++++++++++++++++++++++++++
	print ("Removing data that doesn't have depth")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")   
	fc = joinedWellsWithZ
	#fields = ['GM_WELL_DEPTH_FT', 'TOP_OF_SCREEN__FT_', 'EPA_SCREEN_LENGTH_FT', 'ElevationBottomOfWellFeet']
	# Above changed on 10/21/2022 to deal with change in attribute names
	fields = ['GM_WELL_DEPTH_FT', 'GM_TOP_DEPTH_OF_SCREEN_FT', 'EPA_SCREEN_LENGTH_FT_DBL', 'ElevationBottomOfWellFeet']
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
	fields = ['GM_WELL_DEPTH_FT', 'GM_TOP_DEPTH_OF_SCREEN_FT', 'EPA_SCREEN_LENGTH_FT_DBL', 'ElevationBottomOfWellFeet']
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
	# This code below removed because of email on 10/27/2022 were the group conlcluded that there was no longer a need to drop data and all data would come from gama 
    #print ("Remove WRD, USGS, DHS Data since we have it in WRD dataset")
	#minutes = (time.time()-start)/60
	#print ("Minutes Ran " + str(minutes))
	#print ("")
	#fc = joinedWellsWithZ
	#fields = ['GM_DATA_SOURCE']
	#count = 0
	# Create update cursor for feature class 
	#with arcpy.da.UpdateCursor(fc, fields) as cursor:
	#   # For each row, evaluate the well WellDepthFt and look for nulls
	#   for row in cursor:
	#       if ((row[0] == "WRD") or (row[0] == "DHS") or (row[0] == "USGS")):
	#           cursor.deleteRow()
	#           count = count + 1
	#print ("This many had WRD, DHS, or USGS as source: " + str(count))	

	
	# +++++++++++++++++++++++++++++++++++
	# Flag data that doesn't have good elevations for bottom of well
	# +++++++++++++++++++++++++++++++++++
	print ("Flag data that doesn't have good elevations for bottom of well")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")
	fc = joinedWellsWithZ
	fields = ['GM_WELL_DEPTH_FT', 'ElevationBottomOfWellFeet']
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
	print ("Populate well depth by using screen")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")
	fc = joinedWellsWithZ
	# why is the 3rd one on the string on twice??
	fields = ['GM_TOP_DEPTH_OF_SCREEN_FT', 'ElevationBottomOfWellFeet', 'EPA_SCREEN_LENGTH_FT_DBL', 'ZinFeet', 'BottomCalcMethod']
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
	print ("Populate well depth by using screen length ft")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")
	fc = joinedWellsWithZ
	# why is the 3rd one on the string on twice??
	fields = ['GM_TOP_DEPTH_OF_SCREEN_FT', 'ElevationBottomOfWellFeet', 'EPA_SCREEN_LENGTH_FT_DBL', 'ZinFeet', 'BottomCalcMethod']
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
	print ("Populate well depth by using top of screen")
	minutes = (time.time()-start)/60
	print ("Minutes Ran " + str(minutes))
	print ("")
	fc = joinedWellsWithZ
	# why is the 3rd one on the string on twice??
	fields = ['GM_TOP_DEPTH_OF_SCREEN_FT', 'ElevationBottomOfWellFeet', 'EPA_SCREEN_LENGTH_FT_DBL', 'ZinFeet', 'BottomCalcMethod', 'OBJECTID']
	count2 = 0
	CountBlank = 0
	# Create update cursor for feature class 
	with arcpy.da.UpdateCursor(fc, fields) as cursor:
	    # For each row, evaluate the well PerfsAndAquifersSummary_Max_BOI
	    for row in cursor:
	        #print(str(row[0]) + " ObjectID = " + str(row[5]))
	        if (row[0] != None):
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
	        else:
	             CountBlank = CountBlank + 1
	             
	print("Total GM_TOP_DEPTH_OF_SCREEN_FT that are null = " + str(CountBlank) )
	

# ---------------------------------------
# The above is the subset function
# ---------------------------------------

#Run the subset function
subset()

print ("Made it to the End, Done!")
print('It took', time.time()-start, 'seconds.')
minutes = (time.time()-start)/60
print ("Minutes Ran " + str(minutes))
sys.exit()
# End of Code +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++