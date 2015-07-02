
/**
 * @class Export
 * @classdesc This class is responsible to export project to WebZip file
 */

function ExportScorm(){
	listlang = [];
      var fs = require('fs');
      var data = JSON.parse(fs.readFileSync('js/lib/gui/languages.json', 'utf8'));
      data.forEach(function(languageelement){
          var item = [languageelement.code, languageelement.name];
          listlang.push(item);
      });
     
};


function parserImslrm() {
    var metadatos=Project.Info.LOM;
    var listaclaves = Object.keys(metadatos);
    var imslrm = {};
       


    listaclaves.forEach(function(e){
      
    // General
        
        // Analizando categorias
        if(e.indexOf("cat_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"general.identifier",{last:"array"});
            var x = {"catalog":"", "entry":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.general.identifier.push(x);
        }
       //Analizando titulos
        if(e.indexOf("tit_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"general.title",{last:"array"});
            var x = {"titleLang":"", "title":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="titleLang"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
            }
            if (x["title"]!==""){
                imslrm.general.title.push(x);
            }    
        }    
        
        //Analizando idiomas
        if(e.indexOf("idiom_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"general.language",{last:"array"});
            var x = {"mainLang":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] =searchCodelanguage(aux[field]);
               
            }
            imslrm.general.language.push(x);
        }    

        //Analizando descriptions
        if(e.indexOf("descGeneral_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"general.description",{last:"array"});
            var x = {"descGeneralLang":"","Description":""};
            var aux = Project.Info.LOM[e]
            for(var field in aux){


                if (field.split("_")[0]==="descGeneralLang"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
       
               
            }
            if (x["Description"]!==""){
                imslrm.general.description.push(x);
            }    
        }    

         //Analizando keywords
        if(e.indexOf("keywordGeneral_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"general.keyword",{last:"array"});
            var x = {"keywordGeneralLang":"","keywordGeneral1":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="keywordGeneralLang"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
             
               
            }
            if (x["keywordGeneral1"]!==""){
                imslrm.general.keyword.push(x);
            }    
        }    

        //Analizando coverage
        if(e.indexOf("coverage_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"general.coverage",{last:"array"});
            var x = {"coverageLang":"","coverage1":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="coverageLang"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
                            
            }
            if (x["coverage1"]!==""){
                imslrm.general.coverage.push(x);
            }    
        }    

        //Analizando structure
               
        if(e.indexOf("structuresGeneral_1") === 0 ){
                      
            imslrm.general.structure=Project.Info.LOM[e];
      
        }

         //Analizando aggregationLevel
               
        if(e.indexOf("aggregationLevels_1") === 0 ){
            imslrm.general.aggregationLevel=searchCodeAggregation(Project.Info.LOM[e]);;
        
        }
      

    //lifeCycle
        
         //Analizando versionlifeCycle
        if(e.indexOf("versionlifecycle_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"lifeCycle.version",{last:"array"});
            var x = {"lifeCycleLang":"","versionlifecycle1":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="lifeCycleLang"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
                          
            }
            if (x["versionlifecycle1"]!==""){
                imslrm.lifeCycle.version.push(x);
            }
        }    
         //Analizando status
               
        if(e.indexOf("statusLifeCycle_1_1") === 0 ){
            imslrm.lifeCycle.status=Project.Info.LOM[e];
    
        }

        //Analizando contribute
               
        if(e.indexOf("contrLyfeCycle_") === 0){
            var aux = metadatos[e];
            ExportScorm.prototype.checkname(imslrm,"lifeCycle.contribute",{last:"array"})
            var contribute = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if( field.indexOf("rolesLifeCycle_")===0){
                    contribute.rolesLifeCycle = aux[field];
                }
                if( field.indexOf("nameContribLifeCycle_")===0){
                    ExportScorm.prototype.checkname(contribute,"entity");
                    contribute.entity.nameContribLifeCycle = aux[field];
                }
                if( field.indexOf("emailContribLifeCycle_")===0){
                    ExportScorm.prototype.checkname(contribute,"entity");
                    contribute.entity.emailContribLifeCycle = aux[field];
                }
                if( field.indexOf("organContribLifeCycle_")===0){
                    ExportScorm.prototype.checkname(contribute,"entity");
                    contribute.entity.organContribLifeCycle = aux[field];
                }
                if( field.indexOf("dateContribLifeCycle_")===0){
             
                    contribute.dateContribLifeCycle = aux[field];
                }
                if( field.indexOf("DIVdescContribLifeCycle_")===0){
                    ExportScorm.prototype.checkname(contribute,"description",{last:"array"});
                    var x = {"ContribLifeCycleLang":"","DescriptionContribLifeCycle":""};
                    for( var info in aux[field]){
                       if (info.split("_")[0]==="ContribLifeCycleLang"){
   
                            x[info.split("_")[0]] = searchCodelanguage(aux[field][info]);
                        }else{
                            x[info.split("_")[0]] = aux[field][info];
                        }
         
               
                     }
                     if (x["DescriptionContribLifeCycle"]!==""){
                        contribute.description.push(x);
                     }   
                }     
                
                
            });
           imslrm.lifeCycle.contribute.push(contribute);
          
        }    
        
    //Metametada

        //Analizando Identifier
        if(e.indexOf("catMetadata_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"metaMetadata.identifier",{last:"array"});
            var x = {"metametadataCatalog":"", "metametadataEntry":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.metaMetadata.identifier.push(x);
        }

        //Analizando MetaMetadata Schema

        if (e.indexOf("schemaMetametadataValue_1")===0){
                        
            imslrm.metaMetadata.metadataSchema=Project.Info.LOM[e];
        }
       
       //Analizando MetaMetadata Language

        if (e.indexOf("langMetametadataValue_")===0){
              
            imslrm.metaMetadata.langMetametada=searchCodelanguage(Project.Info.LOM[e]);
        }

       // Analizando MetaMetada contribute

                      
        if(e.indexOf("contrMetametadata_") === 0){
            var aux = metadatos[e];
            ExportScorm.prototype.checkname(imslrm,"metaMetadata.contribute",{last:"array"})
            var contribute = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if( field.indexOf("rolesMetametadata_")===0){
                    contribute.rolesMetametadata = aux[field];
                }
                if( field.indexOf("nameContribMetametadata_")===0){
                    ExportScorm.prototype.checkname(contribute,"entity");
                    contribute.entity.nameContribMetametadata = aux[field];
                }
                if( field.indexOf("emailContribMetametadata_")===0){
                    ExportScorm.prototype.checkname(contribute,"entity");
                    contribute.entity.emailContribMetametadata = aux[field];
                }
                if( field.indexOf("organContribMetametadata_")===0){
                    ExportScorm.prototype.checkname(contribute,"entity");
                    contribute.entity.organContribMetametadata = aux[field];
                }
                if( field.indexOf("dateContribMetametadata_")===0){
               //     ExportScorm.prototype.checkname(contribute,"date");
                    contribute.dateContribMetametadata = aux[field];
                }
                if( field.indexOf("DIVdescContribMetametadata_")===0){
                    ExportScorm.prototype.checkname(contribute,"description",{last:"array"});
                    var x = {"ContribMetametadataLang":"","DescriptionContribMetametadata":""};
                    for( var info in aux[field]){
                        if (info.split("_")[0]==="ContribMetametadataLang"){
   
                            x[info.split("_")[0]] = searchCodelanguage(aux[field][info]);
                        }else{
                            x[info.split("_")[0]] = aux[field][info];
                        }
                     }
                     if (x["DescriptionContribMetametadata"]!==""){
                        contribute.description.push(x);
                     }   
                }     
                
                
            });
           imslrm.metaMetadata.contribute.push(contribute);
          
        }    

    // Technical
        //Analizando format Technical
        if(e.indexOf("formatTechnical_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"technical.format",{last:"array"});
            var x = {"formatTechnicalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.technical.format.push(x);
        }        

        //Analizando size Technical
        if(e.indexOf("sizeTechnicalValue_1") === 0 ){
            imslrm.technical.size=Project.Info.LOM[e];
           
        }     

        //Analizando  location Technical
        if(e.indexOf("locationTechnical_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"technical.location",{last:"array"});
            var x = {"locationTechnicalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            if (x["locationTechnicalValue"]!==""){
                imslrm.technical.location.push(x);
            }    
        }   

        // Analizando requeriments Technical

       if(e.indexOf("requirementsTechnical_") === 0){
            var aux = metadatos[e];
            ExportScorm.prototype.checkname(imslrm,"technical.requirement",{last:"array"})
            var requirement = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if( field.indexOf("typeTechnicalReq_")===0){
                    requirement.typeTechnicalReq = aux[field];
                }
                if( field.indexOf("nameTechnicalReq_")===0){
                    requirement.nameTechnicalReq = aux[field];
                }
                if( field.indexOf("minVerTechnicalReq_")===0){
                    requirement.minVerTechnicalReq = aux[field];
                }
                if( field.indexOf("versmaxTechnicalReq_")===0){
                    requirement.maxVerTechnicalReq = aux[field];
                }
                          
            });
           imslrm.technical.requirement.push(requirement);
          
        }  

       // Analizando installRemarks Technical
          
        if(e.indexOf("installRemTech_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"technical.installationRemarks",{last:"array"});
            var x = {"installRemTechValue":"", "LangRemTech":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                
                if (field.split("_")[0]==="LangRemTech"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
               
            }
            if (x["installRemTechValue"]!==""){
                imslrm.technical.installationRemarks.push(x);
            } 

        }      

       // Analizando otherPlatformRequirements Technical

        if(e.indexOf("requirementsRemTech_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"technical.otherPlatformRequirements",{last:"array"});
            var x = {"requirementsRemTechValue":"", "LangOtherTech":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="LangOtherTech"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
            
            }
            if (x["requirementsRemTechValue"]!==""){
                imslrm.technical.otherPlatformRequirements.push(x);
            }    
        }  

        //Analizando duration technical

        ExportScorm.prototype.checkname(imslrm,"technical.duration",{last:"list"})

        if (e.indexOf("durationYearsDurTech_1")===0){
                        
            imslrm.technical.duration.durationYearsDurTech=Project.Info.LOM[e];
        }

        if (e.indexOf("durationMonthsDurTech_1")===0){
                        
            imslrm.technical.duration.durationMonthsDurTech=Project.Info.LOM[e];
        }

        if (e.indexOf("durationDaysDurTech_1")===0){
                        
            imslrm.technical.duration.durationDaysDurTech=Project.Info.LOM[e];
        }
        
        if (e.indexOf("durationHoursDurTech_1")===0){
                        
            imslrm.technical.duration.durationHoursDurTech=Project.Info.LOM[e];
        }


        if (e.indexOf("durationminutesDurTech_1")===0){
                        
            imslrm.technical.duration.durationMinutesDurTech=Project.Info.LOM[e];
        }

        if (e.indexOf("durationsecondsDurTech_1")===0){
                        
            imslrm.technical.duration.durationSecondsDurTech=Project.Info.LOM[e];
        }


        if(e.indexOf("descdurationDurTech_") === 0){
            ExportScorm.prototype.checkname(imslrm,"technical.duration.description",{last:"array"})
            var x = {"DescriptionDurTech":"","languageDescDurTech":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="languageDescDurTech"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
                             
            }
            if (x["DescriptionDurTech"]!==""){
                imslrm.technical.duration.description.push(x);
            }    
          
        }  

    // Analizando Educational
        
        // Analizando Educational Interactivity Type
        if(e.indexOf("intTypeEducationalValue_1") === 0 ){
            ExportScorm.prototype.checkname(imslrm,"educational",{last:"list"});
            imslrm.educational.interactivityType=Project.Info.LOM[e];
       
        } 

        // Analizando Educational Resource Type
        if(e.indexOf("resourceTypeEducational_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"educational.learningResourceType",{last:"array"});
            var x = {"resourceTypeEducationalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.educational.learningResourceType.push(x);
        }  


        // Analizando Interactivity Level
        
        if(e.indexOf("levelIntEducationalValue_1") === 0 ){
            imslrm.educational.levelIntEducational=Project.Info.LOM[e];
       
        } 

        // Analizando Semantic Level

        if(e.indexOf("levelDensEducationalValue_1") === 0 ){
            imslrm.educational.levelDensEducational=Project.Info.LOM[e];
       
        } 

        // Analizando intendedEndUserRole
        if(e.indexOf("endUserEducational_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"educational.intendedEndUserRole",{last:"array"});
            var x = {"endUserEducationalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.educational.intendedEndUserRole.push(x);
        }  

        // Analizando contextEducational_
        if(e.indexOf("contextEducational_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"educational.context",{last:"array"});
            var x = {"contextEducationalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.educational.context.push(x);
        }  

        // Analizando rangeAgeEducational_
        if(e.indexOf("rangeAgeEducational_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"educational.typicalAgeRange",{last:"array"});
            var x = {"rangeAgeEducationalValue":"","languageRangeEducational":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="languageRangeEducational"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
               
            }
            
            if (x["rangeAgeEducationalValue"]!==""){
                imslrm.educational.typicalAgeRange.push(x);
            }    
        }  

        // Analizando difficulty

        if(e.indexOf("difficultyEducationalValue_1") === 0 ){
            imslrm.educational.difficulty=Project.Info.LOM[e];
       
        }


        //Analizando dtypicalLearningTime

        ExportScorm.prototype.checkname(imslrm,"educational.typicalLearningTime",{last:"list"})

        if (e.indexOf("durationYearsEducational_1")===0){
                        
            imslrm.educational.typicalLearningTime.durationYearsEducational=Project.Info.LOM[e];
        }

        if (e.indexOf("durationMonthsEducational_1")===0){
                        
            imslrm.educational.typicalLearningTime.durationMonthsEducational=Project.Info.LOM[e];
        }

        if (e.indexOf("durationDaysEducational_1")===0){
                        
            imslrm.educational.typicalLearningTime.durationDaysEducational=Project.Info.LOM[e];
        }
        
        if (e.indexOf("durationHoursEducational_1")===0){
                        
            imslrm.educational.typicalLearningTime.durationHoursEducational=Project.Info.LOM[e];
        }


        if (e.indexOf("durationminutesEducational_1")===0){
                        
            imslrm.educational.typicalLearningTime.durationMinutesEducational=Project.Info.LOM[e];
        }

        if (e.indexOf("durationsecondsEducational_1")===0){
                        
            imslrm.educational.typicalLearningTime.durationSecondsEducational=Project.Info.LOM[e];
        }


        if(e.indexOf("descLearningTimeEducational_") === 0){
            ExportScorm.prototype.checkname(imslrm,"educational.typicalLearningTime.description",{last:"array"})
            var x = {"DescriptionLearningEducational":"","langDurationEducational":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="langDurationEducational"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
              
            }
            if (x["DescriptionLearningEducational"]!==""){
                imslrm.educational.typicalLearningTime.description.push(x);
            }
        }  

        // Analizando description
        if(e.indexOf("descEducationUse_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"educational.description",{last:"array"});
            var x = {"descEducationUseValue":"","langDescrEducational":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="langDescrEducational"){
   
                    x[field.split("_")[0]] = searchCodelanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
                  
            }
            if (x["descEducationUseValue"]!==""){
                imslrm.educational.description.push(x);
            }    
        }  

        // Analizando language
        if(e.indexOf("languageEducationalUse_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"educational.language",{last:"array"});
            var x = {"languageEducationalUseValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] =searchCodelanguage(aux[field]);
               
            }
            imslrm.educational.language.push(x);
        }  

        // Analizando cognitiveProcess
        if(e.indexOf("processcogEducational_") === 0 ){
            
            ExportScorm.prototype.checkname(imslrm,"educational.cognitiveProcess",{last:"array"});
            var x = {"processcogEducationalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.educational.cognitiveProcess.push(x);
        }  

      //Analizando  rigths


        // Analizando rigths cost
        if(e.indexOf("costRightsValue_1") === 0 ){
            ExportScorm.prototype.checkname(imslrm,"rights",{last:"list"});
            imslrm.rights.cost=Project.Info.LOM[e];
       
        } 

        // Analizando rights copyrightAndOtherRestrictions

        if(e.indexOf("copyrightRightsValue_1") === 0 ){
            imslrm.rights.copyrightAndOtherRestrictions=Project.Info.LOM[e];
       
        }

        // Analizando rights description

        if(e.indexOf("descRights_") === 0 ){
           
            var aux = metadatos[e];
            ExportScorm.prototype.checkname(imslrm,"rights.description",{last:"list"});
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                
                if( field.indexOf("descRightsValue_")===0){
                    imslrm.rights.description.descRightsValue = aux[field];
                }
                if( field.indexOf("descRightsLang_")===0){
                    var lang=searchCodelanguage(aux[field]);
                    imslrm.rights.description.descRightsLang =lang;
                }
            });
            if (imslrm.rights.description.descRightsValue === "" || typeof imslrm.rights.description.descRightsValue === "undefined"){
                delete imslrm.rights.description;
            }

        }

        // Analizando rights access

        if(e.indexOf("accessTypeRights_1") === 0 ){
             ExportScorm.prototype.checkname(imslrm,"rights.access",{last:"list"});
             imslrm.rights.access.accessType=Project.Info.LOM[e];
       
        }

        if(e.indexOf("DescriptionAccessRights_") === 0 ){
             ExportScorm.prototype.checkname(imslrm,"rights.access.description",{last:"list"});
             imslrm.rights.access.description.descRightsValue=Project.Info.LOM[e];
       
        }

          if(e.indexOf("langAccessRights_") === 0 ){
             ExportScorm.prototype.checkname(imslrm,"rights.access.description",{last:"list"});
             imslrm.rights.access.description.descRightsLang=searchCodelanguage(Project.Info.LOM[e]);
       
        }

    // Analizando  Relations
        
       if(e.indexOf("relationRelations_") === 0){
            var aux = metadatos[e];
            ExportScorm.prototype.checkname(imslrm,"relation",{last:"array"})
            var relation = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if(field.indexOf("relationRelationsValue_")===0){
                    relation.kind = aux[field];
                }
               
                if(field.indexOf("catalogRelations_")===0){
                  ExportScorm.prototype.checkname(relation,"resource",{last:"list"})  
                  relation.resource.catalogRelations=aux[field];
                }

                if(field.indexOf("entryRelations_")===0){
                  relation.resource.entryRelations=aux[field];
                } 

                if(field.indexOf("DescriptionRelationRelations_")===0){
                  ExportScorm.prototype.checkname(relation,"resource.description",{last:"list"})  
                  relation.resource.description.DescriptionRelationRelations=aux[field];
                }     
                if(field.indexOf("relationRelationsLang_")===0){
                  relation.resource.description.relationRelationsLang=searchCodelanguage(aux[field]);
                }     

                
          
            });
            if (relation.resource.description.DescriptionRelationRelations === "" || typeof relation.resource.description.DescriptionRelationRelations === "undefined"){
                    delete relation.resource.description;
            }
            imslrm.relation.push(relation);
          
        }     

    // Analizando Annotation      

        if(e.indexOf("annotationAnnotations_") === 0){
            var aux = metadatos[e];
            ExportScorm.prototype.checkname(imslrm,"annotation",{last:"array"})
            var annotation = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if(field.indexOf("nameAnnotations_")===0){
                  ExportScorm.prototype.checkname(annotation,"entity",{last:"list"})  
                  annotation.entity.name = aux[field];
                }
               
                if(field.indexOf("emailAnnotations_")===0){
                  annotation.entity.email=aux[field];
                }

                if(field.indexOf("organAnnotations_")===0){
                  annotation.entity.organization=aux[field];
                } 

                if(field.indexOf("dateAnnotations_")===0){
                  ExportScorm.prototype.checkname(annotation,"date",{last:"list"})  
                  annotation.date.dateTime=aux[field];
                }     
                
                if(field.indexOf("DescriptionDateAnnotations_")===0){
                   ExportScorm.prototype.checkname(annotation,"date.description",{last:"list"})
                   annotation.date.description.DescriptionDateAnnotations=aux[field];
                }    
                
                if(field.indexOf("langDateAnnotations_")===0){
                   annotation.date.description.langDateAnnotations=searchCodelanguage(aux[field]);
                }     
 
                if(field.indexOf("DescriptionAnnotations_")===0){
                   ExportScorm.prototype.checkname(annotation,"description",{last:"list"})
                   annotation.description.DescriptionAnnotations=aux[field];
                }
                
                if(field.indexOf("LangAnnotations_")===0){
                   var x=searchCodelanguage(aux[field]);
                   annotation.description.LangAnnotations=searchCodelanguage(aux[field]);
                }
                          
            });

            if (annotation.date.description.DescriptionDateAnnotations===""){
                delete annotation.date.description
            } 

            if (annotation.description.DescriptionAnnotations===""){
                delete annotation.description
            } 

           imslrm.annotation.push(annotation);
          
        }   

    // Analizando classification 
    
        if(e.indexOf("classificationsClassification_") === 0){  
            var aux = metadatos[e];
            var that=this;
            ExportScorm.prototype.checkname(imslrm,"classification",{last:"array"})
            var classification = {};
            Object.keys(aux).forEach(function(field){ 
                if(field.indexOf("typePurposeClassification_")===0){
                    classification.purpose = aux[field];
                }

                if(field.indexOf("DescriptionTaxonClassification_")===0){
                  ExportScorm.prototype.checkname(classification,"description",{last:"list"})
                  classification.description.DescriptionTaxonClassification = aux[field];
                }

                if(field.indexOf("tituloLangTaxonClassification_")===0){
                   classification.description.LangTaxonClassification = searchCodelanguage(aux[field]);
                }
                
                
                if(field.indexOf("DIVkeyClassification_") === 0 ){
                    ExportScorm.prototype.checkname(classification,"keywords",{last:"array"});
                    var x = {"KeywordTaxonClassification":"", "titleLangKeywordTaxonClassification":""};
                    var auxKey=aux[field];
                    for(var fieldK in auxKey){
                       if (fieldK.split("_")[0]==="titleLangKeywordTaxonClassification"){
   
                            x[fieldK.split("_")[0]] = searchCodelanguage(auxKey[fieldK]);
                        }else{
                            x[fieldK.split("_")[0]] = auxKey[fieldK];
                        }
               
                    }
                    if (x["KeywordTaxonClassification"]!==""){
                        classification.keywords.push(x);
                    }    
                  
                }  
                

                if(field.indexOf("DIVpathClassification_") === 0 ){
                    ExportScorm.prototype.checkname(classification,"taxonPath",{last:"array"});
                    var x = {"sourceNameClassification":"", "langClassification":"","nameTaxonClassification":"","idTaxonClassification":"","langClassificationTaxon":""};
                    var auxKey=aux[field];
                    for(var fieldK in auxKey){
                        if ((fieldK.split("_")[0]==="langClassification") || (fieldK.split("_")[0]==="langClassificationTaxon")){
   
                            x[fieldK.split("_")[0]] = searchCodelanguage(auxKey[fieldK]);
                        }else{
                            x[fieldK.split("_")[0]] = auxKey[fieldK];
                        }
               
                    }
                    if (x["sourceNameClassification"]===""){
                            delete x.sourceNameClassification;
                            delete x.langClassification
                    }
                   
                    classification.taxonPath.push(x);
                 } 

            

            });

            if (classification.description.DescriptionTaxonClassification === "" ){
                    delete classification.description;
            }
           imslrm.classification.push(classification);  
        }
             
    });
    return imslrm;
};

function searchCodelanguage(language)
{
    var result = "";
    listlang.forEach(function(element){
        if(element[1] == language){
            result = element[0];
        } 
    });

    return result;
};    

function searchCodeAggregation(agregationLevel)
{
    var result="";
    var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
    var i=1;
    dictionary.Agregations.forEach(function(element){
        if (element==agregationLevel){
            result=i;
        }
        i++;
   }); 
   return result;
}    



  /*  element.children(childrenName).each(function(){
        if(dictionaryName == null)
            Project.Info.LOM[arrayName] = $(this).find("value").text();
        else{
            if(index == null)
                Project.Info.LOM[arrayName] = CBI18n.gettext($(this).find("value").text());
            else    
                Project.Info.LOM[arrayName] = dictionary[dictionaryName][parseInt($(this).find("value").text())-1];
            }
        i++;
    });
}*/

ExportScorm.prototype.checkname=function checkname(dest,namespace,options){
    //var names = nameSpaceString.split(".");
    options = $.extend({},{last:"list"},options);
    var names=namespace.split(".");
    var parent = dest;
    var imax = names.length;
    var i;
    //if any nameSpace level doesn't exist, create it
    for (i = 0; i < imax  ; i++) {
        if (!parent[names[i]]) {
            if (i === imax - 1){
                if (options.last.toLowerCase() === "array")
                    parent[names[i]] = [];
                else
                    parent[names[i]] = {};
            }
            else{
                parent[names[i]] = {};
            }
        }
        parent = parent[names[i]];
    }
};


ExportScorm.prototype.createTemppath=function createTemppath(){
    var mktemp = require('mktemp');
    var temppath = mktemp.createDirSync("/tmp/cloudbook_XXXX");
    return temppath + "/";    

};


ExportScorm.prototype.renderImslrm=function renderImslrm(dest){
    
    var fs = require('fs');
    var fileimslrm = "";
  
    var fullmetainfo = parserImslrm();
    var template = fs.readFileSync('./templates/imslrm.hbs',{encoding:'utf8'});
    var templatecompiled = application.util.template.compile(template);
    fileimslrm = templatecompiled(fullmetainfo);

    fs.writeFileSync(dest+"imslrm.xml", fileimslrm);

   
};    

ExportScorm.prototype.renderImsmanifest=function renderImsmanifest(dest){
    var fs = require('fs');
    var pretty = require('pretty-data').pd;
    var filemanifest="";

    var itemstemplate = fs.readFileSync('./templates/itemscorm.hbs',{encoding:"utf8"});
    var manifestemplate=fs.readFileSync('./templates/imsmanifest.hbs', {encoding:"utf8"});
    var resourcetemplate=fs.readFileSync('./templates/resourcescorm.hbs', {encoding:"utf8"});

    application.util.template.registerPartial("scormitem",itemstemplate);
    application.util.template.registerPartial("resourceitem",resourcetemplate);

    var imsmanifest = application.util.template.compile(manifestemplate);

    //var objeto = require('./netadmin/Escriptori/handlebars/manifest_Scorm.json');

    var objeto={
    "depends" : {
        "INTERACTIVEMULTIOPTIONS": ["rsrc/jsgeork.js","rsrc/jsgeork.css"],
        "INTERACTIVEONEOPTIONS": ["rsrc/jsgeork.js","rsrc/jsgeork.css"],
        "INTERACTIVEFILLINGAPS": ["rsrc/jsgeork.js","rsrc/jsgeork.css"]

    },
    
    "items" :{
        "I-1001":{
            "title" : "Section",
            "filename" : "index0.html",
            "depends": ["INTERACTIVEMULTIOPTIONS", "INTERACTIVEONEOPTIONS"],
            "resourcecode": "R-1001"

        },
        "I-1002":{
            "title" : "Secció 2",
            "filename" : "index1.html",
            "content" : ["/rsrc/00Imagen.png"],
            "resourcecode": "R-1002"

        },

        "I-1003":{
            "title" : "Secció 3",
            "filename" : "index2.html",
            "depends": ["INTERACTIVEFILLINGAPS"],
            "resourcecode": "R-1003"

        }
    }
    
};

    filemanifest=imsmanifest(objeto);
    fs.writeFileSync(dest+"imsmanifest.xml", filemanifest);


};


ExportScorm.prototype.copyScormfiles=function copyScormfiles(dest){
   var fs = require('fs');
   var files_to_copy = []; 
   var dir='rsrc/scorm/scorm_2004_v4/'
   
   
   var fs = window.require('fs');
   var filenames=fs.readdirSync(dir);
   for (var i=0; i<filenames.length; i++){
        var file = filenames[i];
        var fsextra = window.require('fs-extra');
        fsextra.ensureDirSync(dest);
        fsextra.copySync(dir+file,dest+file);
      
    }
  
};
   

ExportScorm.prototype.renderhtml=function renderhtml(dest){
    var createhtml = application.exporthtml.core.getInstance();
    createhtml.do_html(dest);

};


ExportScorm.prototype.paramScorm=function paramScorm(destino){
     
   var tempath = this.createTemppath();       
   
   this.renderImslrm(tempath);
   this.copyScormfiles(tempath);
   this.renderhtml(tempath);
   this.renderImsmanifest(tempath);
   this.createZip(tempath,destino);


};



ExportScorm.prototype.createZip=function createZip(directorio,destino){    
    
      var zipFolder = require('zip-folder');
    
      var zipFileName="" + destino + "";
      
      var directorioOrigen="" + directorio + "";
      
          
      var that = this;

      $("#exportscormwizard").find('.waitingOK').css("display","inline");
      zipFolder(directorioOrigen, zipFileName, function(err) {
            if(err) {
                console.log('oh no!', err);
            $("#exportscormwizard").find('.waitingOK').css("display","none");
            $("#exportscormwizard").find('.waitingER').css("display","inline");
            } else {
                 console.log('EXCELLENT');
            $("#exportscormwizard").dialog("destroy");
                      
        }
    });
        
};    
        
      


CBUtil.createNameSpace('application.core.exports.exportscorm.core');
application.core.exports.exportscorm.core = CBUtil.singleton(ExportScorm);
