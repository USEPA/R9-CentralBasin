import arcpy

# For each field in the feature class, print
#  the field name, type, and length.
#"D:\Program Files\ArcGIS\Pro\bin\Python\envs\arcgispro-py3\python.exe" ListAttributes.py

# D:\Python27\ArcGISx6410.9\python.exe ListAttributes.py

arcpy.env.workspace = "D:/R9Data/CentralBasin3D/2022Phase2/Gama/output.gdb"

fc = "gamapt"

print (fc)

fields = arcpy.ListFields(fc)

for field in fields:
    print("{0}, {1}, {2}"
          .format(field.name, field.type, field.length))