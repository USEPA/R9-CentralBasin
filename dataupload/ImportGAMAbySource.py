# -*- coding: utf-8 -*-
"""
Generated by ArcGIS ModelBuilder on : 2023-06-07 10:44:40
"""
import arcpy
from sys import argv
def TableIterator(workspace, wild_card, recursive) :
  with arcpy.EnvManager(workspace = workspace):
    dataset_list = [""]
    if recursive:
      datasets = arcpy.ListDatasets()
      dataset_list.extend(datasets)

    for dataset in dataset_list:
      for table in arcpy.ListTables(wild_card, feature_type, dataset):
        yield os.path.join(workspace, dataset, table), table

def breakloopfnc(in_values, condition) :
  for cnd in in_values:
    if ((not cnd)and bool(condition)) or  (cnd and (not bool(condition)))
      return False 
  return True 


def ImportGAMAbySource(DataUpdate_20230201="C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\OriginalData\\DataUpdate_20230201", gama_all_losangeles_v3="C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_all_losangeles_v3"):  # Import GAMA by Source

    # To allow overwriting outputs change overwriteOutput option to True.
    arcpy.env.overwriteOutput = False

    arcpy.ImportToolbox(r"c:\program files\arcgis\pro\Resources\ArcToolbox\toolboxes\Data Management Tools.tbx")
    CentralBasinBoundary = "C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\Sites.gdb\\CentralBasinBoundary"

    for Table, Name in TableIterator(DataUpdate_20230201, "", "", "NOT_RECURSIVE"):

        # Process: XY Table To Point (XY Table To Point) (management)
        XY_Data = "C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\Default.gdb\\%name%"
        arcpy.management.XYTableToPoint(in_table=Table, out_feature_class=XY_Data, x_field="GM_LONGITUDE", y_field="GM_LATITUDE", z_field="", coordinate_system="GEOGCS[\"GCS_WGS_1984\",DATUM[\"D_WGS_1984\",SPHEROID[\"WGS_1984\",6378137.0,298.257223563]],PRIMEM[\"Greenwich\",0.0],UNIT[\"Degree\",0.0174532925199433]];-400 -400 1000000000;-100000 10000;-100000 10000;8.98315284119521E-09;0.001;0.001;IsHighPrecision")

        # Process: Pairwise Clip (Pairwise Clip) (analysis)
        _name_ = "C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\%name%"
        with arcpy.EnvManager(outputZFlag="Disabled"):
            arcpy.analysis.PairwiseClip(in_features=XY_Data, clip_features=CentralBasinBoundary, out_feature_class=_name_, cluster_tolerance="")

        # Process: Delete (Delete) (management)
        if _name_:
            Delete_Succeeded = arcpy.management.Delete(in_data=[XY_Data], data_type="")[0]

        # Process: Stop (Stop) ()
        if Delete_Succeeded and _name_:
            Continue = breakloopfnc(in_values=[_name_], condition="TRUE")[0]
            if ( Continue ):
                break

        # Process: Merge (Merge) (management)
        if Continue and Delete_Succeeded and _name_:
            arcpy.management.Merge(inputs=[_name_], output=gama_all_losangeles_v3, field_mappings="GM_DATASET_NAME \"GM_DATASET_NAME\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_DATASET_NAME,0,8000;GM_WELL_CATEGORY \"GM_WELL_CATEGORY\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_WELL_CATEGORY,0,8000;GM_DATA_SOURCE \"GM_DATA_SOURCE\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_DATA_SOURCE,0,8000;GM_WELL_ID \"GM_WELL_ID\" true true false 4 Long 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_WELL_ID,-1,-1;GM_CHEMICAL_VVL \"GM_CHEMICAL_VVL\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_CHEMICAL_VVL,0,8000;GM_CHEMICAL_NAME \"GM_CHEMICAL_NAME\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_CHEMICAL_NAME,0,8000;GM_RESULT_MODIFIER \"GM_RESULT_MODIFIER\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_RESULT_MODIFIER,0,8000;GM_RESULT \"GM_RESULT\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_RESULT,-1,-1;GM_RESULT_UNITS \"GM_RESULT_UNITS\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_RESULT_UNITS,0,8000;GM_SAMP_COLLECTION_DATE \"GM_SAMP_COLLECTION_DATE\" true true false 8 Date 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_SAMP_COLLECTION_DATE,-1,-1;GM_REPORTING_LIMIT \"GM_REPORTING_LIMIT\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_REPORTING_LIMIT,0,8000;GM_LATITUDE \"GM_LATITUDE\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_LATITUDE,-1,-1;GM_LONGITUDE \"GM_LONGITUDE\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_LONGITUDE,-1,-1;GM_WELL_DEPTH_FT \"GM_WELL_DEPTH_FT\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_WELL_DEPTH_FT,0,8000;GM_TOP_DEPTH_OF_SCREEN_FT \"GM_TOP_DEPTH_OF_SCREEN_FT\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_TOP_DEPTH_OF_SCREEN_FT,-1,-1;GM_BOTTOM_DEPTH_OF_SCREEN_FT \"GM_BOTTOM_DEPTH_OF_SCREEN_FT\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_BOTTOM_DEPTH_OF_SCREEN_FT,-1,-1;GM_CAS_NUMBER \"GM_CAS_NUMBER\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_CAS_NUMBER,0,8000;GM_ALTWELL_ID1 \"GM_ALTWELL_ID1\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_ALTWELL_ID1,0,8000;GM_ALTWELL_ID2 \"GM_ALTWELL_ID2\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_ALTWELL_ID2,0,8000;GM_ALTWELL_ID3 \"GM_ALTWELL_ID3\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",GM_ALTWELL_ID3,0,8000;SRC_CHEMICAL \"SRC_CHEMICAL\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_CHEMICAL,0,8000;SRC_RESULT_MODIFIER \"SRC_RESULT_MODIFIER\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_RESULT_MODIFIER,0,8000;SRC_RESULT \"SRC_RESULT\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_RESULT,-1,-1;SRC_RESULT_UNITS \"SRC_RESULT_UNITS\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_RESULT_UNITS,0,8000;SRC_SAMP_COLLECTION_DATE \"SRC_SAMP_COLLECTION_DATE\" true true false 8 Date 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_SAMP_COLLECTION_DATE,-1,-1;SRC_SAMP_COLLECTION_TIME \"SRC_SAMP_COLLECTION_TIME\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_SAMP_COLLECTION_TIME,0,8000;SRC_REPORTING_LIMIT \"SRC_REPORTING_LIMIT\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_REPORTING_LIMIT,0,8000;SRC_ANALYTICAL_METHOD \"SRC_ANALYTICAL_METHOD\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_ANALYTICAL_METHOD,0,8000;SRC_LAB_NOTE \"SRC_LAB_NOTE\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_LAB_NOTE,0,8000;SRC_LATITUDE \"SRC_LATITUDE\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_LATITUDE,-1,-1;SRC_LONGITUDE \"SRC_LONGITUDE\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_LONGITUDE,-1,-1;SRC_DATUM \"SRC_DATUM\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_DATUM,0,8000;SRC_WELL_DEPTH_FT \"SRC_WELL_DEPTH_FT\" true true false 8000 Text 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_WELL_DEPTH_FT,0,8000;SRC_TOP_DEPTH_OF_SCREEN_FT \"SRC_TOP_DEPTH_OF_SCREEN_FT\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_TOP_DEPTH_OF_SCREEN_FT,-1,-1;SRC_BOTTOM_DEPTH_OF_SCREEN_FT \"SRC_BOTTOM_DEPTH_OF_SCREEN_FT\" true true false 8 Double 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",SRC_BOTTOM_DEPTH_OF_SCREEN_FT,-1,-1;RULEID \"RULEID\" true true false 4 Long 0 0,First,#,\"C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\gama_wrd_losangeles_v3\",RULEID,-1,-1", add_source="ADD_SOURCE_INFO")

if __name__ == '__main__':
    # Global Environment settings
    with arcpy.EnvManager(scratchWorkspace=r"C:\Users\Kat Plank\OneDrive - Innovate, Inc!\Documents\R9 Projects\SFD_23_04554_CentralBasin3DGISSupport\ArcProProjects\Testing\Default.gdb", workspace=r"C:\Users\Kat Plank\OneDrive - Innovate, Inc!\Documents\R9 Projects\SFD_23_04554_CentralBasin3DGISSupport\ArcProProjects\Testing\Default.gdb"):
        ImportGAMAbySource(*argv[1:])
