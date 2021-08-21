var BgscrollHandler=pc.createScript("bgscrollHandler");BgscrollHandler.attributes.add("BGLayer1Speed",{type:"number",default:.1}),BgscrollHandler.attributes.add("BModel",{type:"Asset",default:.1}),BgscrollHandler.prototype.initialize=function(){},BgscrollHandler.prototype.update=function(t){var e=this.entity.getPosition(),i=e.x-this.BGLayer1Speed;this.entity.setPosition(new pc.Vec3(i,e.y,-1)),this.entity.getPosition().x<-171&&this.entity.setPosition(new pc.Vec3(249-this.BGLayer1Speed,e.y,-1))};var ButterflyPlayerController=pc.createScript("butterflyPlayerController");ButterflyPlayerController.attributes.add("GameManagerEntity",{type:"entity"}),ButterflyPlayerController.attributes.add("ButterflyColliderEntity",{type:"entity"}),ButterflyPlayerController.attributes.add("ForwardSpeed",{type:"number",default:.1}),ButterflyPlayerController.attributes.add("UpSpeed",{type:"number",default:.1}),ButterflyPlayerController.attributes.add("DownSpeed",{type:"number",default:.1}),ButterflyPlayerController.attributes.add("IsUp",{type:"boolean",default:!1}),ButterflyPlayerController.attributes.add("IsDown",{type:"boolean",default:!0}),ButterflyPlayerController.attributes.add("MAXHeight",{type:"number",default:5}),ButterflyPlayerController.attributes.add("MinHeight",{type:"number",default:-5}),ButterflyPlayerController.attributes.add("IsGameRunning",{type:"boolean",default:!0}),ButterflyPlayerController.prototype.initialize=function(){this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.OnTouchStart,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.OnTouchEnd,this)),this.app.mouse&&(this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.OnMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.OnMouseUp,this))},ButterflyPlayerController.prototype.update=function(t){if(this.IsGameRunning&&!globalVariables.IsGamePause){var e=this.entity.getPosition();if(this.IsDown){var r=e.y-this.DownSpeed;r>this.MinHeight&&(e.y=r,this.entity.setPosition(e))}else if(this.IsUp){var o=e.y+this.UpSpeed;o<this.MAXHeight&&(e.y=o,this.entity.setPosition(e))}this.entity.translate(this.ForwardSpeed*t*20,0,0)}},ButterflyPlayerController.prototype.OnMouseDown=function(){this.IsDown=!1,this.IsUp=!0},ButterflyPlayerController.prototype.OnMouseUp=function(){this.IsUp=!1,this.IsDown=!0},ButterflyPlayerController.prototype.OnTouchStart=function(){this.IsDown=!1,this.IsUp=!0},ButterflyPlayerController.prototype.OnTouchEnd=function(){this.IsUp=!1,this.IsDown=!0};var CameraFollow=pc.createScript("cameraFollow");CameraFollow.attributes.add("FollowEntity",{type:"entity"}),CameraFollow.attributes.add("NewPosition",{type:"vec3"}),CameraFollow.attributes.add("MovPosition",{type:"vec3"}),CameraFollow.prototype.initialize=function(){this.NewPosition=new pc.Vec3,this.MovPosition=new pc.Vec3,this.inertia=.15},CameraFollow.prototype.update=function(t){var i=Math.min(t/this.inertia,1),o=this.entity.getPosition(),e=this.FollowEntity.getPosition();this.NewPosition.x=e.x+6,this.NewPosition.y=0,this.NewPosition.z=30,this.MovPosition.lerp(o,this.NewPosition,i),this.entity.setPosition(this.MovPosition)};var RandomSnowSpawn=pc.createScript("randomSnowSpawn");RandomSnowSpawn.attributes.add("templateAsset",{type:"asset",assetType:"template",array:!0}),RandomSnowSpawn.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},RandomSnowSpawn.prototype.onTriggerEnter=function(t){if(console.log(t.tags),t.tags.has("ButterflyCoin")){var e=pc.math.random(0,2),n=this.templateAsset[Math.floor(e)].resource.instantiate(),o=this.entity.getPosition();n.setPosition(o),n.setRotation(0,0,0,1),this.entity.parent.addChild(n)}else t.tags.has("deleteInstances")&&(console.log("WHY IT IS NOT DELETING?"),this.entity.destroy())},RandomSnowSpawn.prototype.update=function(t){};var Coinrotation=pc.createScript("coinrotation");Coinrotation.attributes.add("rotationAngle",{type:"number",default:0}),Coinrotation.prototype.initialize=function(){},Coinrotation.prototype.update=function(t){this.entity.rotate(0,100*t,0)};var CoinInstancer=pc.createScript("coinInstancer");CoinInstancer.attributes.add("coinTemplete",{type:"asset",assetType:"template"}),CoinInstancer.prototype.initialize=function(){var t=this.coinTemplete.resource.instantiate(),e=this.entity.getPosition();t.setPosition(e)},CoinInstancer.prototype.update=function(t){};var EnableCoinsSet=pc.createScript("enableCoinsSet");EnableCoinsSet.prototype.initialize=function(){},EnableCoinsSet.prototype.update=function(e){};var CoinEnabler=pc.createScript("coinEnabler");CoinEnabler.attributes.add("CoinsSetEntity",{type:"entity"}),CoinEnabler.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},CoinEnabler.prototype.onTriggerEnter=function(t){t.tags.has("ButterflyCoin")&&(this.CoinsSetEntity.enabled=!0),t.tags.has("Butterfly")};var CoinHandler=pc.createScript("coinHandler");CoinHandler.attributes.add("CoinsSetEntity",{type:"entity"}),CoinHandler.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},CoinHandler.prototype.onTriggerEnter=function(t){t.tags.has("Butterfly")&&(globalVariables.GameManagerEntity.script.gameManager.AddStarCount(1),this.CoinsSetEntity.destroy())};var GameManager=pc.createScript("gameManager");GameManager.attributes.add("UiManagerEntity",{type:"entity"}),GameManager.attributes.add("StarCount",{type:"number",default:0}),GameManager.prototype.initialize=function(){},GameManager.prototype.AddStarCount=function(t){this.StarCount+=t,this.UiManagerEntity.script.uimanager.UpdateStarCount(this.StarCount)},GameManager.prototype.ReduceStarCount=function(t){this.StarCount-=t,this.StarCount<0&&(this.StarCount=0),this.UiManagerEntity.script.uimanager.UpdateStarCount(this.StarCount)},GameManager.prototype.GameEnd=function(){this.UiManagerEntity.script.uimanager.ShowGameEnd(this.StarCount)},GameManager.prototype.Reset=function(){};var UiManager=pc.createScript("uimanager");UiManager.attributes.add("StarCountTxt",{type:"entity"}),UiManager.attributes.add("PauseBtnEntity",{type:"entity"}),UiManager.attributes.add("PauseMenuEntity",{type:"entity"}),UiManager.attributes.add("ResumeBtnEntity",{type:"entity"}),UiManager.attributes.add("RestartBtnEntity",{type:"entity"}),UiManager.attributes.add("AudioBtnEntity",{type:"entity"}),UiManager.attributes.add("GameEndEntity",{type:"entity"}),UiManager.attributes.add("GameEndStarCountTxt",{type:"entity"}),UiManager.attributes.add("GameEndRestartEntity",{type:"entity"}),UiManager.attributes.add("ContinueBtnEntity",{type:"entity"}),UiManager.attributes.add("BirdSceneName",{type:"string"}),UiManager.prototype.initialize=function(){this.app.timeScale=1,this.PauseBtnEntity.button.on("mousedown",this.OnClickPlause,this),this.ResumeBtnEntity.button.on("mousedown",this.OnClickResume,this),this.RestartBtnEntity.button.on("mousedown",this.OnClickRestart,this),this.AudioBtnEntity.button.on("mousedown",this.OnClickAudio,this),this.GameEndRestartEntity.button.on("mousedown",this.OnClickRestart,this),this.ContinueBtnEntity.button.on("mousedown",this.OnClickContinue,this),this.PauseBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickPlause,this),this.ResumeBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickResume,this),this.RestartBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickRestart,this),this.GameEndRestartEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickRestart,this),this.AudioBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickAudio,this),this.ContinueBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickContinue,this),this.StarCountTxt.element.text=0},UiManager.prototype.UpdateStarCount=function(t){this.StarCountTxt.element.text=t},UiManager.prototype.OnClickPlause=function(){this.app.timeScale=0,globalVariables.IsGamePause||(globalVariables.IsGamePause=!0,this.PauseMenuEntity.enabled=!0)},UiManager.prototype.OnClickResume=function(){this.app.timeScale=1,globalVariables.IsGamePause=!1,this.PauseMenuEntity.enabled=!1},UiManager.prototype.OnClickRestart=function(){this.app.timeScale=1,globalVariables.GameManagerEntity.script.gameManager.Reset(),this.Reset(),globalVariables.IsGamePause=!1},UiManager.prototype.OnClickAudio=function(){},UiManager.prototype.ShowSceneTransition=function(){this.LevelTransitionEntity.enabled=!0,setTimeout((()=>{this.LevelTransitionEntity.enabled=!1}),2e3)},UiManager.prototype.ShowGameEnd=function(t){this.app.timeScale=0,globalVariables.IsGamePause=!0,this.GameEndStarCountTxt.element.text=t,this.GameEndEntity.enabled=!0},UiManager.prototype.Reset=function(){globalVariables.IsGamePause=!1,this.PauseMenuEntity.enabled=!1,this.GameEndEntity.enabled=!1,this.StarCountTxt.element.text=0,this.GameEndStarCountTxt.element.text=0},UiManager.prototype.OnClickContinue=function(){var t=this.app.scenes.find(this.BirdSceneName),e=this.app.root.findByName("Root");this.app.scenes.loadSceneHierarchy(t.url,(function(t,n){t?console.error(t):e.destroy()}))};var GlobalVariables=pc.createScript("globalVariables");GlobalVariables.attributes.add("IsGamePause",{type:"boolean",default:!1}),GlobalVariables.attributes.add("ButterFlyEntity",{type:"entity"}),GlobalVariables.attributes.add("GameManagerEntity",{type:"entity"}),GlobalVariables.attributes.add("UIManagerEntity",{type:"entity"}),GlobalVariables.prototype.initialize=function(){window.globalVariables=this};var TransitionHandler=pc.createScript("transitionHandler");TransitionHandler.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},TransitionHandler.prototype.onTriggerEnter=function(n){n.tags.has("Butterfly")&&globalVariables.GameManagerEntity.script.gameManager.GameEnd()};var BirdFly=pc.createScript("birdFly");BirdFly.prototype.initialize=function(){},BirdFly.prototype.update=function(t){this.entity.getPosition();this.entity.translate(.2*t*20*-1,0,0)};var WorldMove=pc.createScript("worldMove");WorldMove.prototype.initialize=function(){},WorldMove.prototype.update=function(t){this.entity.getPosition();this.entity.translate(.002*t*20*-1,0,0)};var EnemyCollision=pc.createScript("enemyCollision");EnemyCollision.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},EnemyCollision.prototype.onTriggerEnter=function(t){t.tags.has("Butterfly")&&(globalVariables.GameManagerEntity.script.gameManager.ReduceStarCount(1),globalVariables.ButterFlyEntity.anim.setBoolean("Hit",!0),setTimeout((()=>{globalVariables.ButterFlyEntity.anim.setBoolean("Hit",!1)}),1e3))};var MeshVis=pc.createScript("meshVis");MeshVis.attributes.add("MeshIndex",{type:"number",array:!0}),MeshVis.attributes.add("OnUpdate",{type:"boolean",default:!1}),MeshVis.prototype.initialize=function(){for(var e=0;e<this.MeshIndex.length;e++){var s=this.entity.model.meshInstances[this.MeshIndex[e]];console.log(s.visible),s.visible=!1}},MeshVis.prototype.update=function(e){if(this.OnUpdate)for(var s=0;s<this.MeshIndex.length;s++){var t=this.entity.model.meshInstances[this.MeshIndex[s]];console.log(t.visible),t.visible=!1}};var MenuManager=pc.createScript("menuManager");MenuManager.attributes.add("MenuEntity",{type:"entity"}),MenuManager.attributes.add("PlayBtnEntity",{type:"entity"}),MenuManager.prototype.initialize=function(){this.PlayBtnEntity.button.on("mousedown",this.OnClickPlay,this),this.PlayBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickPlay,this),this.app.timeScale=0},MenuManager.prototype.OnClickPlay=function(){this.MenuEntity.enabled=!1,this.app.timeScale=1};