const fs = require('fs');
const path = require("path");
const gm = require('gm');
var execSync= require('child_process').execSync;
const Utils = require("./utils.js");

const utils = new Utils()
var sizeOf = require("image-size")
var makeLaunchutils = require("./autoMakeLaunchScreen/makelaunch.js")
var outPath = path.join(__dirname,"./output/")
var workPath = path.join(__dirname,`./res/`)
var commonPath = path.join(__dirname,`./shareRes/`)
var GAME_STYLE = process.argv[2] || "style_NiuNiu"
if (process.argv[3]) {
    outPath = path.join(outPath,process.argv[3])
    utils.mkdirs(outPath)
}

var pixelArray = [
    40,60,29,58,87,80,120,57,114,120,180,20,40,29,58,40,80,50,100,72,144,76,152,167,1024
];
var fileContents = "\
{\
    \"images\": [\
        {\
            \"size\": \"20x20\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-20@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"20x20\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-20@3x.png\",\
            \"scale\": \"3x\"\
        },\
        {\
            \"size\": \"29x29\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-29.png\",\
            \"scale\": \"1x\"\
        },\
        {\
            \"size\": \"29x29\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-29@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"29x29\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-29@3x.png\",\
            \"scale\": \"3x\"\
        },\
        {\
            \"size\": \"40x40\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-40@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"40x40\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-40@3x.png\",\
            \"scale\": \"3x\"\
        },\
        {\
            \"size\": \"57x57\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-57.png\",\
            \"scale\": \"1x\"\
        },\
        {\
            \"size\": \"57x57\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-57@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"60x60\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-60@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"60x60\",\
            \"idiom\": \"iphone\",\
            \"filename\": \"icon-60@3x.png\",\
            \"scale\": \"3x\"\
        },\
        {\
            \"size\": \"20x20\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-20-ipad.png\",\
            \"scale\": \"1x\"\
        },\
        {\
            \"size\": \"20x20\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-20@2x-ipad.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"29x29\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-29-ipad.png\",\
            \"scale\": \"1x\"\
        },\
        {\
            \"size\": \"29x29\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-29@2x-ipad.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"40x40\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-40.png\",\
            \"scale\": \"1x\"\
        },\
        {\
            \"size\": \"40x40\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-40@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"50x50\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-50.png\",\
            \"scale\": \"1x\"\
        },\
        {\
            \"size\": \"50x50\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-50@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"72x72\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-72.png\",\
            \"scale\": \"1x\"\
        },\
        {\
            \"size\": \"72x72\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-72@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"76x76\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-76.png\",\
            \"scale\": \"1x\"\
        },\
        {\
            \"size\": \"76x76\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-76@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"83.5x83.5\",\
            \"idiom\": \"ipad\",\
            \"filename\": \"icon-83.5@2x.png\",\
            \"scale\": \"2x\"\
        },\
        {\
            \"size\": \"1024x1024\",\
            \"idiom\": \"ios-marketing\",\
            \"filename\": \"icon-1024.png\",\
            \"scale\": \"1x\"\
        }\
    ],\
    \"info\": {\
        \"version\": 1,\
        \"author\": \"icon.wuruihong.com\"\
    }\
}\
"
var iconArray = [
    "icon-20@2x.png",
    "icon-20@3x.png",
    "icon-29.png",
    "icon-29@2x.png",
    "icon-29@3x.png",
    "icon-40@2x.png",
    "icon-40@3x.png",
    "icon-57.png",
    "icon-57@2x.png",
    "icon-60@2x.png",
    "icon-60@3x.png",
    "icon-20-ipad.png",
    "icon-20@2x-ipad.png",
    "icon-29-ipad.png",
    "icon-29@2x-ipad.png",
    "icon-40.png",
    "icon-40@2x.png",
    "icon-50.png",
    "icon-50@2x.png",
    "icon-72.png",
    "icon-72@2x.png",
    "icon-76.png",
    "icon-76@2x.png",
    "icon-83.5@2x.png",
    "icon-1024.png",
];






// function mkIcon(){
//     this.workPath = `./res/`
//     this.commonPath = `./shareRes/`
//     var rolePath = path.join(this.workPath,GAME_STYLE,"prop")
//     var count = utils.getfileCount(rolePath)
//     for (var j = 1; j < 5; j++){
//         for(var i = 1; i < count; i++){
//             GenIcon(i)
//         }
//     }
// }
function GenIcon(idx){
    var cfg = require("./cfg");
    if (Math.random() > 0.5 ) {
        cfg = require("./cfg_old");
    }
    var commonZorder = ["bg","prop"]
    var baseIMG = {}
    var config = cfg[GAME_STYLE] || {}
    var childStyles = config.childStyles
    if (childStyles){
        childStyles.sort(function(){
            return 0.5 - Math.random()
        })
        config = childStyles[0]
    }
    var list = config.zorder || commonZorder
    for (let i in list){
        var e = list[i]
        var relpath = null
        if (config.relpath){
            relpath = config.relpath
        }
        var param = getConponentParams(e,relpath,idx)
        if (e == "bg"){
            baseIMG = gm(param[4])
            continue
        } 
        var CMD = `image Over ${param[0]},${param[1]},${param[2]},${param[3]},${param[4]}`
        baseIMG = baseIMG.draw(CMD) 	
    }
    var iconName = "icon.png"
    var appIconPath = path.join(outPath, "AppIcon.appiconset");
    utils.mkdirs(appIconPath);
    var outName = path.join(appIconPath,iconName)
    // let outName = path.join(`./${outPath}/icon_${nums}.png`)
    baseIMG.write(outName,function(err){
        if (err){
            console.log(err)
        }
        console.log("icon大图制作成功")
        var newPath = path.join(outPath, iconName);
        fs.copyFileSync(outName, newPath)
        formatAppIcon(appIconPath, iconName)	
        // makeLaunchutils(outputPath,outName,process.argv[4])	
    })
}
function getConponentParams(item,relpath,idx){
    let x,y,width,height

    let dir = path.join(workPath,GAME_STYLE,item)
    if (relpath) {
        dir =path.join(workPath,GAME_STYLE,relpath[item]) 
    }
    console.log(dir)
    if (!fs.existsSync(dir)) {
        let common_style = "style_Girl"
        dir = path.join(commonPath,common_style,item)
        if (!fs.existsSync(dir)){
            throw `${dir} is not exist`
        }
    }
    let randNum = utils.getRandNum(dir)
    let img  = utils.getfileFilterNew(dir,randNum)
    // if (item == "prop"){
    //     img  = utils.getfileFilterNew(dir,idx)
    // }
    x = 0
    if(item == "prop"){
        x = 1024/2 - sizeOf(img).width/2;
    }
    return [x,0,0,0,img]
}

function formatAppIcon(iconDir, bigestSizeImage){
	// iconDir = iconDir +"/output"
    _make();
    console.log("icon制作成功")
    function _make(){
        execSync("cp \""+iconDir+"/"+bigestSizeImage+"\" \""+iconDir+"/../\"")
        //去除alpha通道
        execSync("convert "+"\""+iconDir+"/../"+bigestSizeImage+"\" -background white -alpha remove -alpha off -resize 1024x1024 "+"\""+iconDir+"/../"+bigestSizeImage+"\"");
        execSync("rm -rf "+iconDir+"/*");
        _makeImage(0);
        function _makeImage(i){
            if(i==iconArray.length) return;
            gm(iconDir+"/../"+bigestSizeImage)
            .resize(pixelArray[i],pixelArray[i],'!')
            .noProfile()
            .write(iconDir+"/"+iconArray[i], function (err) {
                if (err) console.log(err)
                _makeImage(i+1);
            });
        }

        fs.writeFileSync(iconDir+"/Contents.json",fileContents);
    }
}


// exports.GenIcon = GenIcon
GenIcon()








