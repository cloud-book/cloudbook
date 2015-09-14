/**
 * This class is created to manage all the opetarios related with de project's metadata
 * @class MetadadaManager
 */

function MetadataManager() {
    var fs = require('fs');
    var data = JSON.parse(fs.readFileSync('js/lib/gui/languages.json', 'utf8'));
    this.languages = [];
    data.forEach(function(languageelement) {
        var item = [languageelement.code, languageelement.name];
        this.languages.push(item);
    });
}

MetadataManager.prototype.parserMetadata=function parserMetadata(){
    var metadatos = Project.Info.LOM;
    var listaclaves = Object.keys(metadatos);
    var imslrm = {};
    var that=this;
     
   

    listaclaves.forEach(function(e){
        var that=application.metadatamanager.getInstance();
    // General
        
        // Analyzing categories
        if(e.indexOf("cat_") === 0 ){
            
           that.checkname(imslrm,"general.identifier",{last:"array"});
            var x = {"catalog":"", "entry":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.general.identifier.push(x);
        }
       //analyzing titles
        if(e.indexOf("tit_") === 0 ){
            
            that.checkname(imslrm,"general.title",{last:"array"});
            var x = {"titleLang":"", "title":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="titleLang"){
   
                    x[field.split("_")[0]] =  that.searchCodeLanguage(aux[field]);
                }else{                            
                    x[field.split("_")[0]] = aux[field];
                }
            }
            if (x["title"]!==""){
                imslrm.general.title.push(x);
            }    
        }    
        
        //Analyzingo languages
        if(e.indexOf("idiom_") === 0 ){
            
            that.checkname(imslrm,"general.language",{last:"array"});
            var x = {"mainLang":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] =that.searchCodeLanguage(aux[field]);
               
            }
            imslrm.general.language.push(x);
        }    

        //Analyzing descriptions
        if(e.indexOf("descGeneral_") === 0 ){
            
            that.checkname(imslrm,"general.description",{last:"array"});
            var x = {"descGeneralLang":"","Description":""};
            var aux = Project.Info.LOM[e]
            for(var field in aux){


                if (field.split("_")[0]==="descGeneralLang"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
       
               
            }
            if (x["Description"]!==""){
                imslrm.general.description.push(x);
            }    
        }    

         //Analyzing keywords
        if(e.indexOf("keywordGeneral_") === 0 ){
            
            that.checkname(imslrm,"general.keyword",{last:"array"});
            var x = {"keywordGeneralLang":"","keywordGeneral1":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="keywordGeneralLang"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
             
               
            }
            if (x["keywordGeneral1"]!==""){
                imslrm.general.keyword.push(x);
            }    
        }    

        //Analyzing coverage
        if(e.indexOf("coverage_") === 0 ){
            
            that.checkname(imslrm,"general.coverage",{last:"array"});
            var x = {"coverageLang":"","coverage1":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="coverageLang"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
                            
            }
            if (x["coverage1"]!==""){
                imslrm.general.coverage.push(x);
            }    
        }    

        //Analyzing structure
               
        if(e.indexOf("structuresGeneral_1") === 0 ){
                      
            imslrm.general.structure=Project.Info.LOM[e];
      
        }

         //Analyzing aggregationLevel
               
        if(e.indexOf("aggregationLevels_1") === 0 ){
            imslrm.general.aggregationLevel=that.searchCodeAggregation(Project.Info.LOM[e]);;
        
        }
      

    //lifeCycle
        
         //Analyzing versionlifeCycle
        if(e.indexOf("versionlifecycle_") === 0 ){
            
            that.checkname(imslrm,"lifeCycle.version",{last:"array"});
            var x = {"lifeCycleLang":"","versionlifecycle1":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="lifeCycleLang"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
                          
            }
            if (x["versionlifecycle1"]!==""){
                imslrm.lifeCycle.version.push(x);
            }
        }    
         //Analyzing status
               
        if(e.indexOf("statusLifeCycle_1_1") === 0 ){
            imslrm.lifeCycle.status=Project.Info.LOM[e];
    
        }

        //Analyzing contribute
               
        if(e.indexOf("contrLyfeCycle_") === 0){
            var aux = metadatos[e];
            that.checkname(imslrm,"lifeCycle.contribute",{last:"array"})
            var contribute = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if( field.indexOf("rolesLifeCycle_")===0){
                    contribute.rolesLifeCycle = aux[field];
                }
                if( field.indexOf("nameContribLifeCycle_")===0){
                    that.checkname(contribute,"entity");
                    contribute.entity.nameContribLifeCycle = aux[field];
                }
                if( field.indexOf("emailContribLifeCycle_")===0){
                    that.checkname(contribute,"entity");
                    contribute.entity.emailContribLifeCycle = aux[field];
                }
                if( field.indexOf("organContribLifeCycle_")===0){
                    that.checkname(contribute,"entity");
                    contribute.entity.organContribLifeCycle = aux[field];
                }
                if( field.indexOf("dateContribLifeCycle_")===0){
             
                    contribute.dateContribLifeCycle = aux[field];
                }
                if( field.indexOf("DIVdescContribLifeCycle_")===0){
                    that.checkname(contribute,"description",{last:"array"});
                    var x = {"ContribLifeCycleLang":"","DescriptionContribLifeCycle":""};
                    for( var info in aux[field]){
                       if (info.split("_")[0]==="ContribLifeCycleLang"){
   
                            x[info.split("_")[0]] = that.searchCodeLanguage(aux[field][info]);
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

        //Analyzing Identifier
        if(e.indexOf("catMetadata_") === 0 ){
            
            that.checkname(imslrm,"metaMetadata.identifier",{last:"array"});
            var x = {"metametadataCatalog":"", "metametadataEntry":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (aux[field]!==""){
                    x[field.split("_")[0]] = aux[field];
                }
            }
            imslrm.metaMetadata.identifier.push(x);
        }

        //Analyzing MetaMetadata Schema

        if (e.indexOf("schemaMetametadataValue_1")===0){
                        
            imslrm.metaMetadata.metadataSchema=Project.Info.LOM[e];
        }
       
       //Analyzing MetaMetadata Language

        if (e.indexOf("langMetametadataValue_")===0){
              
            imslrm.metaMetadata.langMetametada=that.searchCodeLanguage(Project.Info.LOM[e]);
        }

       // Analyzing MetaMetada contribute

                      
        if(e.indexOf("contrMetametadata_") === 0){
            var aux = metadatos[e];
            that.checkname(imslrm,"metaMetadata.contribute",{last:"array"})
            var contribute = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if( field.indexOf("rolesMetametadata_")===0){
                    contribute.rolesMetametadata = aux[field];
                }
                if( field.indexOf("nameContribMetametadata_")===0){
                    that.checkname(contribute,"entity");
                    contribute.entity.nameContribMetametadata = aux[field];
                }
                if( field.indexOf("emailContribMetametadata_")===0){
                    that.checkname(contribute,"entity");
                    contribute.entity.emailContribMetametadata = aux[field];
                }
                if( field.indexOf("organContribMetametadata_")===0){
                    that.checkname(contribute,"entity");
                    contribute.entity.organContribMetametadata = aux[field];
                }
                if( field.indexOf("dateContribMetametadata_")===0){
               //     that.checkname(contribute,"date");
                    contribute.dateContribMetametadata = aux[field];
                }
                if( field.indexOf("DIVdescContribMetametadata_")===0){
                    that.checkname(contribute,"description",{last:"array"});
                    var x = {"ContribMetametadataLang":"","DescriptionContribMetametadata":""};
                    for( var info in aux[field]){
                        if (info.split("_")[0]==="ContribMetametadataLang"){
   
                            x[info.split("_")[0]] = that.searchCodeLanguage(aux[field][info]);
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
        //Analyzing format Technical
        if(e.indexOf("formatTechnical_") === 0 ){
            
            that.checkname(imslrm,"technical.format",{last:"array"});
            var x = {"formatTechnicalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.technical.format.push(x);
        }        

        //Analyzing size Technical
        if(e.indexOf("sizeTechnicalValue_1") === 0 ){
            imslrm.technical.size=Project.Info.LOM[e];
           
        }     

        //Analyzing  location Technical
        if(e.indexOf("locationTechnical_") === 0 ){
            
            that.checkname(imslrm,"technical.location",{last:"array"});
            var x = {"locationTechnicalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            if (x["locationTechnicalValue"]!==""){
                imslrm.technical.location.push(x);
            }    
        }   

        // Analyzing requeriments Technical

       if(e.indexOf("requirementsTechnical_") === 0){
            var aux = metadatos[e];
            that.checkname(imslrm,"technical.requirement",{last:"array"})
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

       // Analyzing installRemarks Technical
          
        if(e.indexOf("installRemTech_") === 0 ){
            
            that.checkname(imslrm,"technical.installationRemarks",{last:"array"});
            var x = {"installRemTechValue":"", "LangRemTech":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                
                if (field.split("_")[0]==="LangRemTech"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
               
            }
            if (x["installRemTechValue"]!==""){
                imslrm.technical.installationRemarks.push(x);
            } 

        }      

       // Analyzing otherPlatformRequirements Technical

        if(e.indexOf("requirementsRemTech_") === 0 ){
            
            that.checkname(imslrm,"technical.otherPlatformRequirements",{last:"array"});
            var x = {"requirementsRemTechValue":"", "LangOtherTech":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="LangOtherTech"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
            
            }
            if (x["requirementsRemTechValue"]!==""){
                imslrm.technical.otherPlatformRequirements.push(x);
            }    
        }  

        //Analizando duration technical

        that.checkname(imslrm,"technical.duration",{last:"list"})

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
            that.checkname(imslrm,"technical.duration.description",{last:"array"})
            var x = {"DescriptionDurTech":"","languageDescDurTech":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="languageDescDurTech"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
                             
            }
            if (x["DescriptionDurTech"]!==""){
                imslrm.technical.duration.description.push(x);
            }    
          
        }  

    // Analyzing Educational
        
        // Analyzing Educational Interactivity Type
        if(e.indexOf("intTypeEducationalValue_1") === 0 ){
            that.checkname(imslrm,"educational",{last:"list"});
            imslrm.educational.interactivityType=Project.Info.LOM[e];
       
        } 

        // Analyzing Educational Resource Type
        if(e.indexOf("resourceTypeEducational_") === 0 ){
            
            that.checkname(imslrm,"educational.learningResourceType",{last:"array"});
            var x = {"resourceTypeEducationalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.educational.learningResourceType.push(x);
        }  


        // Analyzing Interactivity Level
        
        if(e.indexOf("levelIntEducationalValue_1") === 0 ){
            imslrm.educational.levelIntEducational=Project.Info.LOM[e];
       
        } 

        // Analyzing Semantic Level

        if(e.indexOf("levelDensEducationalValue_1") === 0 ){
            imslrm.educational.levelDensEducational=Project.Info.LOM[e];
       
        } 

        // Analyzing intendedEndUserRole
        if(e.indexOf("endUserEducational_") === 0 ){
            
            that.checkname(imslrm,"educational.intendedEndUserRole",{last:"array"});
            var x = {"endUserEducationalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.educational.intendedEndUserRole.push(x);
        }  

        // Analyzing contextEducational_
        if(e.indexOf("contextEducational_") === 0 ){
            
            that.checkname(imslrm,"educational.context",{last:"array"});
            var x = {"contextEducationalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.educational.context.push(x);
        }  

        // Analyzing rangeAgeEducational_
        if(e.indexOf("rangeAgeEducational_") === 0 ){
            
            that.checkname(imslrm,"educational.typicalAgeRange",{last:"array"});
            var x = {"rangeAgeEducationalValue":"","languageRangeEducational":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="languageRangeEducational"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
               
            }
            
            if (x["rangeAgeEducationalValue"]!==""){
                imslrm.educational.typicalAgeRange.push(x);
            }    
        }  

        // Analyzing difficulty

        if(e.indexOf("difficultyEducationalValue_1") === 0 ){
            imslrm.educational.difficulty=Project.Info.LOM[e];
       
        }


        //Analyzing dtypicalLearningTime

        that.checkname(imslrm,"educational.typicalLearningTime",{last:"list"})

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
            that.checkname(imslrm,"educational.typicalLearningTime.description",{last:"array"})
            var x = {"DescriptionLearningEducational":"","langDurationEducational":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="langDurationEducational"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
              
            }
            if (x["DescriptionLearningEducational"]!==""){
                imslrm.educational.typicalLearningTime.description.push(x);
            }
        }  

        // Analyzing description
        if(e.indexOf("descEducationUse_") === 0 ){
            
            that.checkname(imslrm,"educational.description",{last:"array"});
            var x = {"descEducationUseValue":"","langDescrEducational":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                if (field.split("_")[0]==="langDescrEducational"){
   
                    x[field.split("_")[0]] = that.searchCodeLanguage(aux[field]);
                }else{
                    x[field.split("_")[0]] = aux[field];
                }
                  
            }
            if (x["descEducationUseValue"]!==""){
                imslrm.educational.description.push(x);
            }    
        }  

        // Analyzing language
        if(e.indexOf("languageEducationalUse_") === 0 ){
            
            that.checkname(imslrm,"educational.language",{last:"array"});
            var x = {"languageEducationalUseValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] =that.searchCodeLanguage(aux[field]);
               
            }
            imslrm.educational.language.push(x);
        }  

        // Analyzing cognitiveProcess
        if(e.indexOf("processcogEducational_") === 0 ){
            
            that.checkname(imslrm,"educational.cognitiveProcess",{last:"array"});
            var x = {"processcogEducationalValue":""};
            var aux = Project.Info.LOM[e]
            for( var field in aux){
                x[field.split("_")[0]] = aux[field];
               
            }
            imslrm.educational.cognitiveProcess.push(x);
        }  

      //Analyzing  rigths


        // Analyzing rigths cost
        if(e.indexOf("costRightsValue_1") === 0 ){
            that.checkname(imslrm,"rights.cost",{last:"list"});
            imslrm.rights.cost=Project.Info.LOM[e];
       
        } 

        // Analyzing rights copyrightAndOtherRestrictions

        if(e.indexOf("copyrightRightsValue_1") === 0 ){
            that.checkname(imslrm,"rights.copyrightAndOtherRestrictions",{last:"list"});
            imslrm.rights.copyrightAndOtherRestrictions=Project.Info.LOM[e];
       
        }

        // Analyzing rights description

        if(e.indexOf("descRights_") === 0 ){
           
            var aux = metadatos[e];
            that.checkname(imslrm,"rights.description",{last:"list"});
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                
                if( field.indexOf("descRightsValue_")===0){
                    imslrm.rights.description.descRightsValue = aux[field];
                }
                if( field.indexOf("descRightsLang_")===0){
                    var lang=that.searchCodeLanguage(aux[field]);
                    imslrm.rights.description.descRightsLang =lang;
                }
            });
            if (imslrm.rights.description.descRightsValue === "" || typeof imslrm.rights.description.descRightsValue === "undefined"){
                delete imslrm.rights.description;
            }

        }

        // Analyzing rights access

        if(e.indexOf("accessTypeRights_1") === 0 ){
             that.checkname(imslrm,"rights.access",{last:"list"});
             imslrm.rights.access.accessType=Project.Info.LOM[e];
       
        }

        if(e.indexOf("DescriptionAccessRights_") === 0 ){
             that.checkname(imslrm,"rights.access.description",{last:"list"});
             imslrm.rights.access.description.descRightsValue=Project.Info.LOM[e];
       
        }

          if(e.indexOf("langAccessRights_") === 0 ){
             that.checkname(imslrm,"rights.access.description",{last:"list"});
             imslrm.rights.access.description.descRightsLang=that.searchCodeLanguage(Project.Info.LOM[e]);
       
        }

    // Analyzing  Relations
        
       if(e.indexOf("relationRelations_") === 0){
            var aux = metadatos[e];
            that.checkname(imslrm,"relation",{last:"array"})
            var relation = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if(field.indexOf("relationRelationsValue_")===0){
                    relation.kind = aux[field];
                }
               
                if(field.indexOf("catalogRelations_")===0){
                  that.checkname(relation,"resource",{last:"list"})  
                  relation.resource.catalogRelations=aux[field];
                }

                if(field.indexOf("entryRelations_")===0){
                  relation.resource.entryRelations=aux[field];
                } 

                if(field.indexOf("DescriptionRelationRelations_")===0){
                  that.checkname(relation,"resource.description",{last:"list"})  
                  relation.resource.description.DescriptionRelationRelations=aux[field];
                }     
                if(field.indexOf("relationRelationsLang_")===0){
                  relation.resource.description.relationRelationsLang=that.searchCodeLanguage(aux[field]);
                }     

                
          
            });
            if (relation.resource.description.DescriptionRelationRelations === "" || typeof relation.resource.description.DescriptionRelationRelations === "undefined"){
                    delete relation.resource.description;
            }
            imslrm.relation.push(relation);
          
        }     

    // Analyzing Annotation      

        if(e.indexOf("annotationAnnotations_") === 0){
            var aux = metadatos[e];
            that.checkname(imslrm,"annotation",{last:"array"})
            var annotation = {};
            Object.keys(aux).forEach(function(field){
                //field : key of aux
                if(field.indexOf("nameAnnotations_")===0){
                  that.checkname(annotation,"entity",{last:"list"})  
                  annotation.entity.name = aux[field];
                }
               
                if(field.indexOf("emailAnnotations_")===0){
                  annotation.entity.email=aux[field];
                }

                if(field.indexOf("organAnnotations_")===0){
                  annotation.entity.organization=aux[field];
                } 

                if(field.indexOf("dateAnnotations_")===0){
                  that.checkname(annotation,"date",{last:"list"})  
                  annotation.date.dateTime=aux[field];
                }     
                
                if(field.indexOf("DescriptionDateAnnotations_")===0){
                   that.checkname(annotation,"date.description",{last:"list"})
                   annotation.date.description.DescriptionDateAnnotations=aux[field];
                }    
                
                if(field.indexOf("langDateAnnotations_")===0){
                   annotation.date.description.langDateAnnotations=that.searchCodeLanguage(aux[field]);
                }     
 
                if(field.indexOf("DescriptionAnnotations_")===0){
                   that.checkname(annotation,"description",{last:"list"})
                   annotation.description.DescriptionAnnotations=aux[field];
                }
                
                if(field.indexOf("LangAnnotations_")===0){
                   var x=that.searchCodeLanguage(aux[field]);
                   annotation.description.LangAnnotations=that.searchCodeLanguage(aux[field]);
                }
                          
            });

          

           imslrm.annotation.push(annotation);
          
        }   

    // Analyzing classification 
    
        if(e.indexOf("classificationsClassification_") === 0){  
            var aux = metadatos[e];
            
            that.checkname(imslrm,"classification",{last:"array"})
            var classification = {};
            Object.keys(aux).forEach(function(field){ 
                if(field.indexOf("typePurposeClassification_")===0){
                    classification.purpose = aux[field];
                }

                if(field.indexOf("DescriptionTaxonClassification_")===0){
                  that.checkname(classification,"description",{last:"list"})
                  classification.description.DescriptionTaxonClassification = aux[field];
                }

                if(field.indexOf("tituloLangTaxonClassification_")===0){
                   classification.description.LangTaxonClassification =that.searchCodeLanguage(aux[field]);
                }
                
                
                if(field.indexOf("DIVkeyClassification_") === 0 ){
                    that.checkname(classification,"keywords",{last:"array"});
                    var x = {"KeywordTaxonClassification":"", "titleLangKeywordTaxonClassification":""};
                    var auxKey=aux[field];
                    for(var fieldK in auxKey){
                       if (fieldK.split("_")[0]==="titleLangKeywordTaxonClassification"){
   
                            x[fieldK.split("_")[0]] = that.searchCodeLanguage(auxKey[fieldK]);
                        }else{
                            x[fieldK.split("_")[0]] = auxKey[fieldK];
                        }
               
                    }
                    if (x["KeywordTaxonClassification"]!==""){
                        classification.keywords.push(x);
                    }    
                  
                }  
                

                if(field.indexOf("DIVpathClassification_") === 0 ){
                    that.checkname(classification,"taxonPath",{last:"array"});
                    var x = {"sourceNameClassification":"", "langClassification":"","nameTaxonClassification":"","idTaxonClassification":"","langClassificationTaxon":""};
                    var auxKey=aux[field];
                    for(var fieldK in auxKey){
                        if ((fieldK.split("_")[0]==="langClassification") || (fieldK.split("_")[0]==="langClassificationTaxon")){
   
                            x[fieldK.split("_")[0]] = that.searchCodeLanguage(auxKey[fieldK]);
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

           
           imslrm.classification.push(classification);  
        }
             
    });
    trimArray(imslrm);
    return imslrm;
};

MetadataManager.prototype.trimArray=function trimArray(data){
    if (!(typeof data == undefined || data ==null)){
        var listaclaves = Object.keys(data);

       // listaclaves.forEach(function(e){
        for (i=0; i<listaclaves.length;i++){
            if (typeof(data[e]) === 'string'){
                data[e]=data[e].trim()
            }
            else{
                this.trimArray(data[e]);
            };
        };
    }; 
};   


/**
 * Auxiliary function to get the code for metadata language
 */

MetadataManager.prototype.searchCodeLanguage=function searchCodeLanguage(language)
{
    var result = "";
    this.languages.forEach(function(element){
        if(element[1] == language){
            result = element[0];
        } 
    });

    return result;
};    

/**
 * Auxiliary function to get the code for metadata aggregation level
 */
MetadataManager.prototype.searchCodeAggregation=function searchCodeAggregation(agregationLevel)
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
};    


/**
 * Auxiliary function to check and / or generate json structure necessary 
   for parsing metadata project during the generation of imslrm.xml file
 */
MetadataManager.prototype.checkname=function checkname(dest,namespace,options){
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
    return true;
};

MetadataManager.prototype.renderImslrm=function renderImslrm(dest){
    
    var fs = require('fs');
    var fileimslrm = "";
    try{
        var fullmetainfo =this.parserMetadata();
        var template = fs.readFileSync('./templates/imslrm.hbs',{encoding:'utf8'});
        var templatecompiled = application.util.template.compile(template);
        fileimslrm = templatecompiled(fullmetainfo);
        fs.writeFileSync(dest+"imslrm.xml", fileimslrm);
        return null;
    }
    catch(e){
        return e;
    }
};    


/**
 * This namespace has singleton instance of MetadataManager class
 * @namespace metadatamanager
 * @memberOf application
 */
CBUtil.createNameSpace('application.metadatamanager');
application.metadatamanager = CBUtil.singleton(MetadataManager);
