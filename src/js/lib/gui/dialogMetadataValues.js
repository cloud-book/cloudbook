var mydictionary= {};

mydictionary['Structures'] = ["atomic", "collection", "linear", "hierarchical", "networked"];
mydictionary['Agregations'] = ["resources and integrated resources", "learning objects","teaching sequences", "training programmes, courses and plans"];
mydictionary['Status'] = [ "draft", "final", "revised", "unavailable"];
mydictionary['Roles'] = [ "author", "publisher", "initiator", "terminator", "validator", "editor", "graphical designer", "technical implementer", "content provider", 
"technical validator", "educational validator", "script writer", "instructional designer", "subject matter expert"];
mydictionary['RolesMetadata'] = ['creator', 'validator'];
mydictionary['TechnicalType'] = ["operating system", "browser"];
mydictionary['NamesOS'] = ["pc-dos", "ms-windows", "linux", "macos", "unix", "multi-os", "none"];
mydictionary['Browser'] = ["any", "mozilla firefox", "netscape communicator", "ms-internet explorer","opera", "amaya"];
mydictionary['InterType'] = ["active", "expositive", "mixed"];
mydictionary['ResourceType'] = ["photograph", "illustration", "video", "animation", "music", "sound effect", "voice-over", "compound audio", "narrative text", "hipertext", 
  "computer graphics", "integrated media", "database", "table", "graph", "conceptual map", "navigation map", "multimedia presentation", "tutorial", "digital dictionary", "digital encyclopaedia", 
  "digital periodical publication", "thematic or corporate webs/web portals", "wiki", "weblog", "multimedia creation/edition tool", "web design tool", "office tool", "programming tool", 
  "information/knowledge analysys/organization", "process procedure supporting tools", "individual/cooperative/collaborative learning/working management tool",
  "multimedia creation/edition service", "web design service", "office service", "programming service", "information/knowledge analysis/organization service", "process/procedure supporting service",
  "individual/cooperative/collaborative learning/working management service","guided reading", "master class", "textual-image analysis", "discussion activity", "closed exercise or problem",
  "contextualized case problem", "open problem", "real or virtual learning environment", "didactic game", "webquest","experiment", "real project", "simulation", "questionnaire", "exam", "self assessment"];
mydictionary['InteractivityLevel'] = ["very low", "low", "medium", "high", "very high"];
mydictionary['SemanticDensity'] = ["very low", "low", "medium", "high", "very high"];
mydictionary['EndUser'] = ["learner", "special needs learner", "gifted learner", "learners late integration into the education system", , "learner with other specific educational support needs", 
  "general public", "individual", "group", "teacher", "tutor", "family", "information scientist", "computer scientist", "manager", "education expert", "subject matter expert"];
mydictionary['Context'] = ["classroom", "laboratory", "real environment", "home", "mixed", "teacher", "tutor", "family", "schoolmate", "independent", "blended", "presencial", "face to face", "distance"];
mydictionary['Difficulty'] = ["very easy", "easy", "medium", "difficult", "very difficult"];
mydictionary['CognitiveProcess'] = ["analyse", "implement", "collaborate", "compare", "share", "compete", "understand", "prove", "communicate", "contextualize", "control", "cooperate", "create",
  "decide", "define", "describe", "discuss", "desing", "self assessment", "explain", "extrapolate", "innovate", "investigate", "judge", "motivate", "observe",
  "organize", "organize oneself", "plan", "practise", "produce", "recognize", "remember", "write up", "consider", "connect", "represent", "solve", "simulate", "summarize", "value"];
mydictionary['Cost'] = ["yes", "no"];
mydictionary['AuthorRights'] = ["propietary license", "free software license EUPL", "free software license GPL", "dual free content license GPL and EUPL",
  "other free software licenses", "public domain", "intellectual property license", "not appropriate", "creative commons: attribution", 
  "creative commons: attribution - non derived work", "creative commons: attribution - non derived work - non commercial", "creative commons: attribution - non commercial", 
  "creative commons: attribution - non commercial - share alike", "creative commons: attribution - share alike", "license GFDL"];
mydictionary['Accesstype'] = ["universal", "non-universal"];
mydictionary['RelationType'] = ["ispartof", "haspart", "isversionof", "hasversion", "isformatof", "hasformat", "references", "isreferencedby", "isbasedon", "isbasisfor", "requires", "isrequiredby"];
mydictionary['Purposes'] = ["discipline", "idea", "prerrequisite", "educational objective", "accesibility restrictions", "educational level", "skill level", "security level", "competency"];
module.exports = mydictionary;