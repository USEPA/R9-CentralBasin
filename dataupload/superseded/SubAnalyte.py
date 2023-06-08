# SubAnalyte.py
# Used to subsetkey analytes from GAMA dataset
# Written by Frank Roberts
# Written on 11/2/2022
# Updated:
# 

# To run file from cmd line:
# "D:\Program Files\ArcGIS\Pro\bin\Python\envs\arcgispro-py3\python.exe" SubAnalyte.py
# Takes about ?? minutes to run for LA on EPA ER Cloud Server .24
import os, arcpy, time

# Start timer
start = time.time()

path = "D:/R9Data/CentralBasin3D/2022Phase2/Gama/"
geodb = path + "output.gdb"
arcpy.env.workspace = geodb