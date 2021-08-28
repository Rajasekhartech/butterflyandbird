var BgscrollHandler=pc.createScript("bgscrollHandler");BgscrollHandler.attributes.add("BGLayer1Speed",{type:"number",default:.1}),BgscrollHandler.attributes.add("BModel",{type:"Asset",default:.1}),BgscrollHandler.prototype.initialize=function(){},BgscrollHandler.prototype.update=function(t){var e=this.entity.getPosition(),i=e.x-this.BGLayer1Speed;this.entity.setPosition(new pc.Vec3(i,e.y,-1)),this.entity.getPosition().x<-171&&this.entity.setPosition(new pc.Vec3(249-this.BGLayer1Speed,e.y,-1))};var ButterflyPlayerController=pc.createScript("butterflyPlayerController");ButterflyPlayerController.attributes.add("GameManagerEntity",{type:"entity"}),ButterflyPlayerController.attributes.add("ButterflyColliderEntity",{type:"entity"}),ButterflyPlayerController.attributes.add("ForwardSpeed",{type:"number",default:.1}),ButterflyPlayerController.attributes.add("UpSpeed",{type:"number",default:.1}),ButterflyPlayerController.attributes.add("DownSpeed",{type:"number",default:.1}),ButterflyPlayerController.attributes.add("IsUp",{type:"boolean",default:!1}),ButterflyPlayerController.attributes.add("IsDown",{type:"boolean",default:!0}),ButterflyPlayerController.attributes.add("MAXHeight",{type:"number",default:5}),ButterflyPlayerController.attributes.add("MinHeight",{type:"number",default:-5}),ButterflyPlayerController.attributes.add("IsGameRunning",{type:"boolean",default:!0}),ButterflyPlayerController.attributes.add("ForwardSpeedIncreaseFacter",{type:"number",default:45e-6}),ButterflyPlayerController.prototype.initialize=function(){this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.OnTouchStart,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.OnTouchEnd,this)),this.app.mouse&&(this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.OnMouseDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.OnMouseUp,this))},ButterflyPlayerController.prototype.update=function(t){if(this.IsGameRunning&&!globalVariables.IsGamePause){this.ForwardSpeed+=this.ForwardSpeedIncreaseFacter;var e=this.entity.getPosition();if(this.IsDown){var r=e.y-this.DownSpeed;r>this.MinHeight&&(e.y=r,this.entity.setPosition(e))}else if(this.IsUp){var o=e.y+this.UpSpeed;o<this.MAXHeight&&(e.y=o,this.entity.setPosition(e))}this.entity.translate(this.ForwardSpeed*t*20+e.x/5e3,0,0)}},ButterflyPlayerController.prototype.PlayBlink=function(){this.entity.anim.setBoolean("Hit",!0),setTimeout((()=>{this.entity.anim.setBoolean("Hit",!1)}),1e3);for(var t=0,e=0;e<10;e++){var r=300*Math.random();t+=r=Math.floor(r),setTimeout((()=>{this.entity.model.enabled=!this.entity.model.enabled}),t)}setTimeout((()=>{this.entity.model.enabled=!0}),t+100)},ButterflyPlayerController.prototype.OnMouseDown=function(){this.IsDown=!1,this.IsUp=!0},ButterflyPlayerController.prototype.OnMouseUp=function(){this.IsUp=!1,this.IsDown=!0},ButterflyPlayerController.prototype.OnTouchStart=function(){this.IsDown=!1,this.IsUp=!0},ButterflyPlayerController.prototype.OnTouchEnd=function(){this.IsUp=!1,this.IsDown=!0};var CameraFollow=pc.createScript("cameraFollow");CameraFollow.attributes.add("FollowEntity",{type:"entity"}),CameraFollow.attributes.add("NewPosition",{type:"vec3"}),CameraFollow.attributes.add("MovPosition",{type:"vec3"}),CameraFollow.prototype.initialize=function(){this.NewPosition=new pc.Vec3,this.MovPosition=new pc.Vec3,this.inertia=.15},CameraFollow.prototype.update=function(t){var i=Math.min(t/this.inertia,1),o=this.entity.getPosition(),e=this.FollowEntity.getPosition();this.NewPosition.x=e.x+6,this.NewPosition.y=0,this.NewPosition.z=30,this.MovPosition.lerp(o,this.NewPosition,i),this.entity.setPosition(this.MovPosition)};var RandomSnowSpawn=pc.createScript("randomSnowSpawn");RandomSnowSpawn.attributes.add("templateAsset",{type:"asset",assetType:"template",array:!0}),RandomSnowSpawn.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},RandomSnowSpawn.prototype.onTriggerEnter=function(t){if(console.log(t.tags),t.tags.has("ButterflyCoin")){var e=pc.math.random(0,2),n=this.templateAsset[Math.floor(e)].resource.instantiate(),o=this.entity.getPosition();n.setPosition(o),n.setRotation(0,0,0,1),this.entity.parent.addChild(n)}else t.tags.has("deleteInstances")&&(console.log("WHY IT IS NOT DELETING?"),this.entity.destroy())},RandomSnowSpawn.prototype.update=function(t){};var Coinrotation=pc.createScript("coinrotation");Coinrotation.attributes.add("rotationAngle",{type:"number",default:0}),Coinrotation.prototype.initialize=function(){},Coinrotation.prototype.update=function(t){this.entity.rotate(0,100*t,0)};var CoinInstancer=pc.createScript("coinInstancer");CoinInstancer.attributes.add("coinTemplete",{type:"asset",assetType:"template"}),CoinInstancer.prototype.initialize=function(){var t=this.coinTemplete.resource.instantiate(),e=this.entity.getPosition();t.setPosition(e)},CoinInstancer.prototype.update=function(t){};var EnableCoinsSet=pc.createScript("enableCoinsSet");EnableCoinsSet.prototype.initialize=function(){},EnableCoinsSet.prototype.update=function(e){};var CoinEnabler=pc.createScript("coinEnabler");CoinEnabler.attributes.add("CoinsSetEntity",{type:"entity"}),CoinEnabler.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},CoinEnabler.prototype.onTriggerEnter=function(t){};var CoinHandler=pc.createScript("coinHandler");CoinHandler.attributes.add("CoinColider",{type:"entity"}),CoinHandler.prototype.initialize=function(){this.CoinColider.collision.on("triggerenter",this.onTriggerEnter,this)},CoinHandler.prototype.onTriggerEnter=function(n){n.tags.has("Butterfly")&&(console.log("coin Hit"),globalVariables.GameManagerEntity.script.gameManager.AddStarCount(1),globalVariables.SoundManagerEntity.script.soundManager.PlayCoinSound(),this.entity.destroy())};var GameManager=pc.createScript("gameManager");GameManager.attributes.add("UiManagerEntity",{type:"entity"}),GameManager.attributes.add("StarCount",{type:"number",default:0}),GameManager.attributes.add("CoinCollectAnim",{type:"entity"}),GameManager.attributes.add("CoinLoseAnim",{type:"entity"}),GameManager.prototype.initialize=function(){},GameManager.prototype.AddStarCount=function(t){this.CoinCollectAnim.enabled=!0,setTimeout((()=>{this.CoinCollectAnim.enabled=!1}),1500),this.StarCount+=t,this.UiManagerEntity.script.uiManager.UpdateStarCount(this.StarCount)},GameManager.prototype.ReduceStarCount=function(t){this.CoinLoseAnim.enabled=!0,setTimeout((()=>{this.CoinLoseAnim.enabled=!1}),1500),this.StarCount-=t,this.StarCount<0&&(this.StarCount=0),this.UiManagerEntity.script.uiManager.UpdateStarCount(this.StarCount)},GameManager.prototype.GameEnd=function(){this.UiManagerEntity.script.uiManager.ShowGameEnd(this.StarCount)},GameManager.prototype.Reset=function(){};var GlobalVariables=pc.createScript("globalVariables");GlobalVariables.attributes.add("GameManagerEntity",{type:"entity"}),GlobalVariables.attributes.add("SoundManagerEntity",{type:"entity"}),GlobalVariables.attributes.add("UIManagerEntity",{type:"entity"}),GlobalVariables.attributes.add("IsGamePause",{type:"boolean",default:!1}),GlobalVariables.attributes.add("ButterFlyEntity",{type:"entity"}),GlobalVariables.attributes.add("HitParticle",{type:"entity"}),GlobalVariables.prototype.initialize=function(){window.globalVariables=this};var TransitionHandler=pc.createScript("transitionHandler");TransitionHandler.attributes.add("CameraFollow",{type:"entity"}),TransitionHandler.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},TransitionHandler.prototype.onTriggerEnter=function(t){t.tags.has("Butterfly")?(console.log("end Hitted"),this.CameraFollow.script.cameraFollow.enabled=!1,setTimeout((()=>{globalVariables.GameManagerEntity.script.gameManager.GameEnd()}),1500)):t.tags.has("ButterflyBack")&&(t.enabled=!1)};var BirdFly=pc.createScript("birdFly");BirdFly.attributes.add("BirdColider",{type:"entity"}),BirdFly.attributes.add("Fly",{type:"number",default:0}),BirdFly.attributes.add("BlinkAnimEntity",{type:"entity"}),BirdFly.prototype.initialize=function(){this.BirdColider.collision.on("triggerenter",this.onTriggerEnter,this)},BirdFly.prototype.update=function(t){if(1==this.Fly){this.entity.getPosition();this.entity.translate(.2*t*20*-1,0,0),globalVariables.SoundManagerEntity.script.soundManager.BFWingfn()}},BirdFly.prototype.onTriggerEnter=function(t){t.tags.has("Butterfly")?(globalVariables.SoundManagerEntity.script.soundManager.EnemyHitfn(),this.BlinkAnimEntity.enabled=!0,this.BlinkAnimEntity.script.onHitEvent.seconds=25,globalVariables.GameManagerEntity.script.gameManager.ReduceStarCount(1),globalVariables.ButterFlyEntity.anim.setBoolean("Hit",!0),globalVariables.SoundManagerEntity.script.soundManager.BFHitWingfn(),globalVariables.HitParticle.enabled=!0,setTimeout((()=>{globalVariables.HitParticle.enabled=!1}),400),setTimeout((()=>{globalVariables.ButterFlyEntity.anim.setBoolean("Hit",!1),globalVariables.ButterFlyEntity.model.enabled=!0,this.BlinkAnimEntity.enabled=!1}),1e3)):t.tags.has("ButterflyFront")?this.entity.enabled=!0:t.tags.has("ButterflyBack")&&(this.entity.enabled=!1)};var WorldMove=pc.createScript("worldMove");WorldMove.prototype.initialize=function(){},WorldMove.prototype.update=function(t){this.entity.getPosition();this.entity.translate(.002*t*20*-1,0,0)};var EnemyCollision=pc.createScript("enemyCollision");EnemyCollision.attributes.add("BlinkAnimEntity",{type:"entity"}),EnemyCollision.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},EnemyCollision.prototype.onTriggerEnter=function(t){t.tags.has("Butterfly")&&(globalVariables.SoundManagerEntity.script.soundManager.ObstacleHitfn(),this.BlinkAnimEntity.enabled=!0,this.BlinkAnimEntity.script.onHitEvent.seconds=25,globalVariables.GameManagerEntity.script.gameManager.ReduceStarCount(1),globalVariables.ButterFlyEntity.anim.setBoolean("Hit",!0),globalVariables.HitParticle.enabled=!0,setTimeout((()=>{globalVariables.HitParticle.enabled=!1}),400),setTimeout((()=>{globalVariables.ButterFlyEntity.anim.setBoolean("Hit",!1),this.BlinkAnimEntity.enabled=!1}),1e3)),t.tags.has("disableItems")&&(this.entity.enabled=!1)};var MeshVis=pc.createScript("meshVis");MeshVis.attributes.add("MeshIndex",{type:"number",array:!0}),MeshVis.attributes.add("OnUpdate",{type:"boolean",default:!1}),MeshVis.prototype.initialize=function(){for(var e=0;e<this.MeshIndex.length;e++){var s=this.entity.model.meshInstances[this.MeshIndex[e]];console.log(s.visible),s.visible=!1}},MeshVis.prototype.update=function(e){if(this.OnUpdate)for(var s=0;s<this.MeshIndex.length;s++){var t=this.entity.model.meshInstances[this.MeshIndex[s]];console.log(t.visible),t.visible=!1}};var MenuManager=pc.createScript("menuManager");MenuManager.attributes.add("AlifEntity",{type:"entity"}),MenuManager.attributes.add("GameManager",{type:"entity"}),MenuManager.attributes.add("PlayBtn",{type:"entity"}),MenuManager.prototype.initialize=function(){this.PlayBtn.button.on("mousedown",this.OnClickPlay,this),this.PlayBtn.button.on(pc.EVENT_TOUCHSTART,this.OnClickPlay,this),this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseDown,this),this.app.touch&&this.app.touch.on("touchstart",this.OnTouchStart,this)},MenuManager.prototype.OnClickPlay=function(){this.AlifEntity.enabled=!0,setTimeout((()=>{globalVariables.UIManagerEntity.script.uiManager.ShowTask1()}),1e3),this.entity.enabled=!1,this.entity.script.menuManager.enabled=!1},MenuManager.prototype.onMouseDown=function(t){this.OnClickPlay(),this.app.mouse.off(pc.EVENT_MOUSEDOWN,this.onMouseDown,this)},MenuManager.prototype.OnTouchStart=function(t){this.OnClickPlay(),this.app.touch.off("touchstart",this.OnTouchStart,this)};var SoundManager=pc.createScript("soundManager");SoundManager.attributes.add("CoinCollect",{type:"entity"}),SoundManager.attributes.add("ObstacleHit",{type:"entity"}),SoundManager.attributes.add("EnemyHit",{type:"entity"}),SoundManager.attributes.add("BFWing",{type:"entity"}),SoundManager.attributes.add("BFHitWing",{type:"entity"}),SoundManager.prototype.initialize=function(){},SoundManager.prototype.PlayCoinSound=function(){this.CoinCollect.sound.play("CoinCollect")},SoundManager.prototype.ObstacleHitfn=function(){console.log("WORKING"),this.ObstacleHit.sound.play("ObstacleHit")},SoundManager.prototype.EnemyHitfn=function(){this.EnemyHit.sound.play("EnemyHit")},SoundManager.prototype.BFWingfn=function(){this.BFWing.sound.play("BFWing")},SoundManager.prototype.BFHitWingfn=function(){this.BFHitWing.sound.play("BFHitWing")};var EnableEnemies=pc.createScript("enableEnemies");EnableEnemies.attributes.add("EnemyColliderEntity",{type:"entity"}),EnableEnemies.prototype.initialize=function(){},EnableEnemies.prototype.update=function(e){entity.tags.has("ButterflyCoin")&&(this.EnemyColliderEntity.entity.enabled=!0)};var OnHitEvent=pc.createScript("onHitEvent");OnHitEvent.attributes.add("hitChar",{type:"entity"}),OnHitEvent.attributes.add("seconds",{type:"number"}),OnHitEvent.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this),this.seconds=25},OnHitEvent.prototype.update=function(t){if(this.seconds>0){if(this.seconds=this.seconds-1,this.seconds%2==0){console.log(this.seconds);var e=Math.random();this.hitChar.model.enabled=!(e<.5)}}else this.hitChar.model.enabled=!0};var CamMove=pc.createScript("camMove");CamMove.attributes.add("speed",{type:"number"}),CamMove.prototype.update=function(e){if(!globalVariables.IsGamePause){var t=this.entity.getPosition();t.x+=this.speed,this.entity.setPosition(t)}};var ScrollingTexture=pc.createScript("scrollingTexture");ScrollingTexture.attributes.add("materialAsset",{type:"asset"}),ScrollingTexture.attributes.add("speed",{type:"vec2"}),ScrollingTexture.tmp=new pc.Vec2,ScrollingTexture.prototype.initialize=function(){this.materialAsset&&(this.material=this.materialAsset.resource)},ScrollingTexture.prototype.update=function(e){var t=ScrollingTexture.tmp;t.set(this.speed.x,this.speed.y),t.scale(e),this.material.diffuseMapOffset=this.material.diffuseMapOffset.add(t),this.material.normalMapOffset.add(t),this.material.opacityMapOffset.add(t),this.material.update()};var Rotate=pc.createScript("rotate");Rotate.attributes.add("speed",{type:"number",default:1}),Rotate.attributes.add("XPosSpeed",{type:"number",default:0}),Rotate.attributes.add("ZPosSpeed",{type:"number",default:0}),Rotate.prototype.initialize=function(){},Rotate.prototype.update=function(t){this.entity.rotateLocal(t*this.XPosSpeed*20,t*this.speed*20,t*this.ZPosSpeed*20)},Rotate.prototype.swap=function(t){};var ObstaclesHandler=pc.createScript("obstaclesHandler");ObstaclesHandler.attributes.add("ObstacleColider",{type:"entity"}),ObstaclesHandler.prototype.initialize=function(){this.ObstacleColider.collision.on("triggerenter",this.onTriggerEnter,this)},ObstaclesHandler.prototype.onTriggerEnter=function(t){t.tags.has("Butterfly")&&(console.log("Bird Hit"),globalVariables.GameManagerEntity.script.gameManager.ReduceStarCount(1),globalVariables.SoundManagerEntity.script.soundManager.ObstacleHitfn(),globalVariables.ButterFlyEntity.script.butterflyPlayerController.PlayBlink())};var UiManager=pc.createScript("uiManager");UiManager.attributes.add("AlifEntity",{type:"entity"}),UiManager.attributes.add("AlifSet",{type:"entity"}),UiManager.attributes.add("TaskSet1",{type:"entity"}),UiManager.attributes.add("TaskSet2",{type:"entity"}),UiManager.attributes.add("InGameUI",{type:"entity"}),UiManager.attributes.add("StarCountTxt",{type:"entity"}),UiManager.attributes.add("PauseBtnEntity",{type:"entity"}),UiManager.attributes.add("PauseMenuEntity",{type:"entity"}),UiManager.attributes.add("ResumeBtnEntity",{type:"entity"}),UiManager.attributes.add("RestartBtnEntity",{type:"entity"}),UiManager.attributes.add("GameEndEntity",{type:"entity"}),UiManager.attributes.add("GameEndStarCountTxt",{type:"entity"}),UiManager.attributes.add("GameEndRestartEntity",{type:"entity"}),UiManager.attributes.add("ContinueToBirdBtnEntity",{type:"entity"}),UiManager.attributes.add("SoundMuteBtn",{type:"entity"}),UiManager.attributes.add("SoundUnMuteBtn",{type:"entity"}),UiManager.prototype.initialize=function(){this.PauseBtnEntity.button.on("mousedown",this.OnClickPause,this),this.ResumeBtnEntity.button.on("mousedown",this.OnClickResume,this),this.RestartBtnEntity.button.on("mousedown",this.OnClickRestart,this),this.GameEndRestartEntity.button.on("mousedown",this.OnClickRestart,this),this.ContinueToBirdBtnEntity.button.on("mousedown",this.OnclickContinueToBirdLevel,this),this.SoundMuteBtn.button.on("mousedown",this.OnClickMute,this),this.SoundUnMuteBtn.button.on("mousedown",this.OnClickUnMute,this),this.PauseBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickPause,this),this.ResumeBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickResume,this),this.RestartBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickRestart,this),this.GameEndRestartEntity.button.on(pc.EVENT_TOUCHSTART,this.OnClickRestart,this),this.ContinueToBirdBtnEntity.button.on(pc.EVENT_TOUCHSTART,this.OnclickContinueToBirdLevel,this),this.StarCountTxt.element.text=0,this.SoundMuteBtn.button.on(pc.EVENT_TOUCHSTART,this.OnClickMute,this),this.SoundUnMuteBtn.button.on(pc.EVENT_TOUCHSTART,this.OnClickUnMute,this),globalVariables.IsGamePause=!0},UiManager.prototype.ShowTask1=function(t){this.AlifSet.enabled=!0,this.TaskSet1.enabled=!0,setTimeout((()=>{this.ShowTask2()}),9200)},UiManager.prototype.ShowTask2=function(t){this.TaskSet1.enabled=!1,this.TaskSet2.enabled=!0,setTimeout((()=>{this.app.timeScale=1,this.TaskSet2.enabled=!1,this.AlifSet.enabled=!1,globalVariables.IsGamePause=!1,this.AlifEntity.script.robotHandler.ResetTarget(),this.AlifEntity.enabled=!1,this.InGameUI.enabled=!0}),6800)},UiManager.prototype.UpdateStarCount=function(t){this.StarCountTxt.element.text=t},UiManager.prototype.OnClickPause=function(){globalVariables.IsGamePause=!0,this.PauseMenuEntity.enabled=!0,this.app.timeScale=0},UiManager.prototype.OnClickResume=function(){this.app.timeScale=1,globalVariables.IsGamePause=!1,this.PauseMenuEntity.enabled=!1},UiManager.prototype.OnClickRestart=function(){this.app.timeScale=1,this.Reset(),globalVariables.IsGamePause=!1,location.reload()},UiManager.prototype.OnClickMute=function(){this.app.systems.sound.volume=0,this.IsMuted=!1,this.SoundUnMuteBtn.enabled=!0,this.SoundMuteBtn.enabled=!1},UiManager.prototype.OnClickUnMute=function(){this.app.systems.sound.volume=1,this.IsMuted=!0,this.SoundUnMuteBtn.enabled=!1,this.SoundMuteBtn.enabled=!0},UiManager.prototype.ShowGameEnd=function(t){this.GameEndStarCountTxt.element.text=t,this.GameEndEntity.enabled=!0},UiManager.prototype.Reset=function(){this.PauseMenuEntity.enabled=!1,this.GameEndEntity.enabled=!1,this.StarCountTxt.element.text=0,this.GameEndStarCountTxt.element.text=0},UiManager.prototype.OnclickContinueToBirdLevel=function(){console.log("call bird sce");var t=this.app.root.findByName("Root"),e=this.app.scenes.find("BirdGame");this.app.scenes.loadSceneHierarchy(e.url,(function(e,n){e?console.error(e):t.destroy()}))};var RobotHandler=pc.createScript("robotHandler");RobotHandler.attributes.add("TargetPosition",{type:"vec3",default:[0,0,0]}),RobotHandler.attributes.add("TempPosition",{type:"vec3",default:[0,0,0]}),RobotHandler.prototype.initialize=function(){this.from=this.entity.getLocalPosition(),this.temp=this.entity.getLocalPosition(),this.val=0},RobotHandler.prototype.ease=function(t){return t*t*t},RobotHandler.prototype.update=function(t){if(!(this.val>1)){this.val+=t;var e=new pc.Vec3;e.lerp(this.from,this.TargetPosition,this.ease(this.val)),this.entity.setLocalPosition(e)}},RobotHandler.prototype.ResetTarget=function(){this.TargetPosition=this.temp};var AlifHandler=pc.createScript("alifHandler");AlifHandler.attributes.add("IdleMaterial",{type:"asset",assetType:"material"}),AlifHandler.attributes.add("HappyMaterial",{type:"asset",assetType:"material"}),AlifHandler.attributes.add("SadMaterial",{type:"asset",assetType:"material"}),AlifHandler.prototype.initialize=function(){this.PlayWow()},AlifHandler.prototype.PlayIdle=function(){this.material=this.SadMaterial.resource,this.material.emissiveMapOffset.set(.75,0),this.material.update()},AlifHandler.prototype.PlayHappy=function(){this.entity.anim.setTrigger("Yes_Node"),this.material=this.SadMaterial.resource,this.material.emissiveMapOffset.set(.5,0),this.material.update(),setTimeout((()=>{this.PlayIdle()}),2500)},AlifHandler.prototype.PlaySad=function(){this.entity.anim.setTrigger("Sad01"),this.material=this.SadMaterial.resource,this.material.emissiveMapOffset.set(0,.5),this.material.update(),setTimeout((()=>{this.PlayIdle()}),1600)},AlifHandler.prototype.PlayWow=function(){this.entity.anim.setTrigger("Sad01"),this.material=this.SadMaterial.resource,this.material.emissiveMapOffset.set(.25,.5),this.material.update(),setTimeout((()=>{this.PlayIdle()}),16e3)};var AnimateSprite=pc.createScript("animateSprite");AnimateSprite.attributes.add("startFrame",{type:"number",default:0,description:"Frame to start animation from"}),AnimateSprite.attributes.add("numFrames",{type:"number",default:1,description:"Number of frames to play before looping"}),AnimateSprite.attributes.add("frameRate",{type:"number",default:1,description:"Playback frames per second"}),AnimateSprite.prototype.initialize=function(){this.timer=1/this.frameRate,this.frame=this.startFrame},AnimateSprite.prototype.update=function(t){this.timer-=t,this.timer<0&&(this.frame++,this.frame>=this.numFrames+this.startFrame&&(this.frame=this.startFrame),this.entity.element.spriteFrame=this.frame,this.timer=1/this.frameRate)};var SetEnabler=pc.createScript("setEnabler");SetEnabler.attributes.add("Set",{type:"entity"}),SetEnabler.prototype.initialize=function(){this.entity.collision.on("triggerenter",this.onTriggerEnter,this)},SetEnabler.prototype.onTriggerEnter=function(t){(t.tags.has("Front")||t.tags.has("Back"))&&(this.Set.enabled=!0)};var BirdEagleOpstacle=pc.createScript("birdEagleOpstacle");BirdEagleOpstacle.attributes.add("Bird",{type:"entity"}),BirdEagleOpstacle.attributes.add("Eagle",{type:"entity"}),BirdEagleOpstacle.attributes.add("IsBird",{type:"boolean",default:!1}),BirdEagleOpstacle.prototype.initialize=function(){this.IsBird?(this.Bird.enabled=!0,this.Eagle.enabled=!1):(this.Bird.enabled=!1,this.Eagle.enabled=!0)};