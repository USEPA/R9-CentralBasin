# -*- coding: utf-8 -*-
"""
Generated by ArcGIS ModelBuilder on : 2023-06-07 10:45:50
"""
import arcpy
from sys import argv

def Subset(GAMAWells_20230421="C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\GAMAWells_20230421", Expression="GM_WELL_CATEGORY = 'DOMESTIC' Or GM_WELL_CATEGORY = 'MUNICIPAL' Or GM_WELL_CATEGORY = 'WATER SUPPLY, OTHER'"):  # Subset Function

    # To allow overwriting outputs change overwriteOutput option to True.
    arcpy.env.overwriteOutput = False


    # Process: Select Layer By Attribute (Select Layer By Attribute) (management)
    GAMAWells_20230421_v3_2_, Count = arcpy.management.SelectLayerByAttribute(in_layer_or_view=GAMAWells_20230421, selection_type="NEW_SELECTION", where_clause=Expression, invert_where_clause="")

    # Process: Export Features (Export Features) (conversion)
    GAMAWells_20230421_DrinkingWater = "C:\\Users\\Kat Plank\\OneDrive - Innovate, Inc!\\Documents\\R9 Projects\\SFD_23_04554_CentralBasin3DGISSupport\\ArcProProjects\\Testing\\UpdateData_20230201.gdb\\GAMAWells_20230421_DrinkingWater"
    arcpy.conversion.ExportFeatures(in_features=GAMAWells_20230421_v3_2_, out_features=GAMAWells_20230421_DrinkingWater, where_clause="", use_field_alias_as_name="NOT_USE_ALIAS", field_mapping="GM_DATASET_NAME \"GM_DATASET_NAME\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_DATASET_NAME,0,8000;GM_WELL_CATEGORY \"GM_WELL_CATEGORY\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_WELL_CATEGORY,0,8000;GM_DATA_SOURCE \"GM_DATA_SOURCE\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_DATA_SOURCE,0,8000;GM_WELL_ID \"GM_WELL_ID\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_WELL_ID,0,8000;GM_CHEMICAL_VVL \"GM_CHEMICAL_VVL\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_CHEMICAL_VVL,0,8000;GM_CHEMICAL_NAME \"GM_CHEMICAL_NAME\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_CHEMICAL_NAME,0,8000;GM_RESULT_MODIFIER \"GM_RESULT_MODIFIER\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_RESULT_MODIFIER,0,8000;GM_RESULT \"GM_RESULT\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,GM_RESULT,-1,-1;GM_RESULT_UNITS \"GM_RESULT_UNITS\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_RESULT_UNITS,0,8000;GM_SAMP_COLLECTION_DATE \"GM_SAMP_COLLECTION_DATE\" true true false 8 Date 0 0,First,#,GAMAWells_20230421_Layer,GM_SAMP_COLLECTION_DATE,-1,-1;GM_REPORTING_LIMIT \"GM_REPORTING_LIMIT\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,GM_REPORTING_LIMIT,-1,-1;GM_LATITUDE \"GM_LATITUDE\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,GM_LATITUDE,-1,-1;GM_LONGITUDE \"GM_LONGITUDE\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,GM_LONGITUDE,-1,-1;GM_WELL_DEPTH_FT \"GM_WELL_DEPTH_FT\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_WELL_DEPTH_FT,0,8000;GM_TOP_DEPTH_OF_SCREEN_FT \"GM_TOP_DEPTH_OF_SCREEN_FT\" true true false 4 Long 0 0,First,#,GAMAWells_20230421_Layer,GM_TOP_DEPTH_OF_SCREEN_FT,-1,-1;GM_BOTTOM_DEPTH_OF_SCREEN_FT \"GM_BOTTOM_DEPTH_OF_SCREEN_FT\" true true false 4 Long 0 0,First,#,GAMAWells_20230421_Layer,GM_BOTTOM_DEPTH_OF_SCREEN_FT,-1,-1;GM_CAS_NUMBER \"GM_CAS_NUMBER\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_CAS_NUMBER,0,8000;GM_ALTWELL_ID1 \"GM_ALTWELL_ID1\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_ALTWELL_ID1,0,8000;GM_ALTWELL_ID2 \"GM_ALTWELL_ID2\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_ALTWELL_ID2,0,8000;GM_ALTWELL_ID3 \"GM_ALTWELL_ID3\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,GM_ALTWELL_ID3,0,8000;SRC_CHEMICAL \"SRC_CHEMICAL\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_CHEMICAL,0,8000;SRC_RESULT_MODIFIER \"SRC_RESULT_MODIFIER\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_RESULT_MODIFIER,0,8000;SRC_RESULT \"SRC_RESULT\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,SRC_RESULT,-1,-1;SRC_RESULT_UNITS \"SRC_RESULT_UNITS\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_RESULT_UNITS,0,8000;SRC_SAMP_COLLECTION_DATE \"SRC_SAMP_COLLECTION_DATE\" true true false 8 Date 0 0,First,#,GAMAWells_20230421_Layer,SRC_SAMP_COLLECTION_DATE,-1,-1;SRC_SAMP_COLLECTION_TIME \"SRC_SAMP_COLLECTION_TIME\" true true false 4 Long 0 0,First,#,GAMAWells_20230421_Layer,SRC_SAMP_COLLECTION_TIME,-1,-1;SRC_REPORTING_LIMIT \"SRC_REPORTING_LIMIT\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,SRC_REPORTING_LIMIT,-1,-1;SRC_ANALYTICAL_METHOD \"SRC_ANALYTICAL_METHOD\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_ANALYTICAL_METHOD,0,8000;SRC_LAB_NOTE \"SRC_LAB_NOTE\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_LAB_NOTE,0,8000;SRC_LATITUDE \"SRC_LATITUDE\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,SRC_LATITUDE,-1,-1;SRC_LONGITUDE \"SRC_LONGITUDE\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,SRC_LONGITUDE,-1,-1;SRC_DATUM \"SRC_DATUM\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_DATUM,0,8000;SRC_WELL_DEPTH_FT \"SRC_WELL_DEPTH_FT\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_WELL_DEPTH_FT,0,8000;SRC_TOP_DEPTH_OF_SCREEN_FT \"SRC_TOP_DEPTH_OF_SCREEN_FT\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_TOP_DEPTH_OF_SCREEN_FT,0,8000;SRC_BOTTOM_DEPTH_OF_SCREEN_FT \"SRC_BOTTOM_DEPTH_OF_SCREEN_FT\" true true false 8000 Text 0 0,First,#,GAMAWells_20230421_Layer,SRC_BOTTOM_DEPTH_OF_SCREEN_FT,0,8000;RULEID \"RULEID\" true true false 4 Long 0 0,First,#,GAMAWells_20230421_Layer,RULEID,-1,-1;Z \"Z\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,Z,-1,-1;ZinFeet \"ZinFeet\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,ZinFeet,-1,-1;ElevationBottomofWellFeet \"ElevationBottomofWellFeet\" true true false 8 Double 0 0,First,#,GAMAWells_20230421_Layer,ElevationBottomofWellFeet,-1,-1;BottomCalcMethod \"BottomCalcMethod\" true true false 255 Text 0 0,First,#,GAMAWells_20230421_Layer,BottomCalcMethod,0,255;GlobalID \"GlobalID\" false false true 38 GlobalID 0 0,First,#,GAMAWells_20230421_Layer,GlobalID,-1,-1", sort_field=[])

if __name__ == '__main__':
    # Global Environment settings
    with arcpy.EnvManager(scratchWorkspace=r"C:\Users\Kat Plank\OneDrive - Innovate, Inc!\Documents\R9 Projects\SFD_23_04554_CentralBasin3DGISSupport\ArcProProjects\Testing\Default.gdb", workspace=r"C:\Users\Kat Plank\OneDrive - Innovate, Inc!\Documents\R9 Projects\SFD_23_04554_CentralBasin3DGISSupport\ArcProProjects\Testing\Default.gdb"):
        Subset(*argv[1:])