#GamaImport.py
# Used to import GAMA file into ArcGIS
# Written by Frank Roberts
# Written on 7/5/2022
# Updated:
# 10/18/2022 - Added bit to deal with top and bottom of screen not being in double format

# To run file from cmd line:
# "D:\Program Files\ArcGIS\Pro\bin\Python\envs\arcgispro-py3\python.exe" GamaImport.py
# Takes about 188 minutes to run for LA on EPA ER Cloud Server .24
import os, arcpy, time

# Start timer
start = time.time()

path = "D:/R9Data/CentralBasin3D/2022Phase2/Gama/"
geodb = path + "output.gdb"
arcpy.env.workspace = geodb
#inputfile = "gama_all_losangeles_v2.txt"
inputfile = "gama_all_losangeles_v3.txt"

# __________________________________________________
# Create temporary table from CSV file
# __________________________________________________
outputtable = "gamatable"
 
if arcpy.Exists(outputtable):
        print ("Deleting table " + outputtable)
        minutes = (time.time()-start)/60
        print ("Minutes Ran " + str(minutes))
        print ("")
        arcpy.management.Delete(outputtable)
print ("Converting text file to database table")
minutes = (time.time()-start)/60
print ("Minutes Ran " + str(minutes))
print ("")
arcpy.conversion.TableToTable(inputfile, geodb, outputtable)

# __________________________________________________
# Add fields and calc values to overcome Lat and Long coming in as text
# __________________________________________________
print ("Adding fields to database table")
minutes = (time.time()-start)/60
print ("Minutes Ran " + str(minutes))
print ("")
arcpy.management.AddField(outputtable, "GM_TOP_DEPTH_OF_SCREEN_FT_DBL", "DOUBLE", 9, 6, 9)
arcpy.management.AddField(outputtable, "GM_BOTTOM_DEPTH_OF_SCREEN_FT_DBL", "DOUBLE", 9, 6, 9)
arcpy.management.AddField(outputtable, "EPA_SCREEN_LENGTH_FT_DBL", "DOUBLE", 9, 6, 9)
print ("Calculating fields in database table")
minutes = (time.time()-start)/60
print ("Minutes Ran " + str(minutes))
print ("")
arcpy.management.CalculateField(outputtable, "GM_TOP_DEPTH_OF_SCREEN_FT_DBL", "$feature.GM_TOP_DEPTH_OF_SCREEN_FT", "ARCADE")
arcpy.management.CalculateField(outputtable, "GM_BOTTOM_DEPTH_OF_SCREEN_FT_DBL", "$feature.GM_BOTTOM_DEPTH_OF_SCREEN_FT", "ARCADE")
arcpy.management.CalculateField(outputtable, "EPA_SCREEN_LENGTH_FT_DBL", "$feature.GM_BOTTOM_DEPTH_OF_SCREEN_FT_DBL - $feature.GM_TOP_DEPTH_OF_SCREEN_FT_DBL", "ARCADE")
# __________________________________________________
# Create point feature class from Lat and Long values
# __________________________________________________
# Set the local variables
in_table = outputtable
out_feature_class = "gamapt"
x_coords = "SRC_LONGITUDE"
y_coords = "SRC_LATITUDE"
#z_coords = "AltB"

if arcpy.Exists(out_feature_class):
        minutes = (time.time()-start)/60
        print ("Minutes Ran " + str(minutes))
        print ("Deleting table " + out_feature_class)
        arcpy.management.Delete(out_feature_class)

# Make the XY event layer...
#arcpy.management.XYTableToPoint(in_table, out_feature_class, x_coords, y_coords, z_coords, arcpy.SpatialReference(4759, 115700))
print ("Creating Feature Class")
minutes = (time.time()-start)/60
print ("Minutes Ran " + str(minutes))
print ("")
arcpy.management.XYTableToPoint(in_table, out_feature_class, x_coords, y_coords, "", arcpy.SpatialReference(4759, 115700))

arcpy.AddSpatialIndex_management(out_feature_class)

# __________________________________________________
# Delete temporary table
# __________________________________________________
#if arcpy.Exists(outputtable):
#        print ("Deleting table " + outputtable)
#        arcpy.management.Delete(outputtable)
print ("Made it to the End, Done!")
print('It took', time.time()-start, 'seconds.')
minutes = (time.time()-start)/60
print ("Minutes Ran " + str(minutes))