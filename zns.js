Start();
console.info("开始任务");
 
//浏览任务可能有直播或视频，提前静音
console.info("设备设置静音");
var v = device.getMusicVolume()
device.setMusicVolume(0)
CustomSleep(1, 3, '请稍候…');
 
/*
  参数说明：
  参数1：启动的APP名称，如需手动，则填手动
  参数2：对应参数1的APP名称，是否是分身应用，0：正常应用，1：分身有术Pro内部分身，暂不支持其他分身应用（如是多开分身，可在参数1中直接填入分身应用APP名称即可）
  参数3：助力邀请，0：跳过助力邀请 1：助力邀请
  参数4：是否入会，0：不执行入会任务 1：执行入会任务，遇到新入会店铺则退出任务 2：执行入会任务，遇到需入会店铺则返回，等待刷新别的店铺 3:执行入会任务，遇到需入会店铺，等待手动入会
 */
//京东例子
Run("京东", 0, 1, 2); home();
console.info("结束任务");
 
console.info("设备恢复原来音量");
device.setMusicVolume(v)
console.log("音量恢复为" + v);
CustomSleep(1, 3, '请稍候…');
 
console.log("已退出脚本");
engines.myEngine().forceStop()
 
function Start() {
    auto.waitFor();//获取无障碍服务权限
    console.show();//开启悬浮窗
    console.info("京东<集爆竹炸年兽>任务");
    //截图权限申请
    threads.start(function () {
        var beginBtn;
        if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
            CustomSleep(0.5, 1.5, '请稍候…');
            beginBtn.click();
        }
    });
    CustomSleep(0.5, 1.5, '请稍候…');
    if (!requestScreenCapture(false)) {
        console.log("请求截图失败");
        exit();
    }
}
 
function Run(LauchAPPName, IsSeparation, IsInvite, IsJoinMember) {
    var PageStatus = 0//页面状态，用于记录当前页面状态，避免点击错位置
    if (IsSeparation == null) {
        IsSeparation = 0 //0：正常应用 1：分身有术内部应用
    } if (IsJoinMember == null) {
        IsJoinMember = 0 //0：不执行入会任务 1：执行入会任务，遇到新入会店铺则退出脚本 2：执行入会任务，遇到需入会店铺则返回，等待刷新别的店铺 3:执行入会任务，遇到需入会店铺，等待手动入会
    }
    var IsSeparation_info = ""
    var IsInvite_info = ""
    var IsJoinMember_info = ""
    if (IsSeparation == 0) {
        IsSeparation_info = "正常应用"
    } else if (IsSeparation == 1) {
        IsSeparation_info = "分身有术Pro"
    } else {
        IsSeparation_info = "无效参数，改为默认值“非分身应用”"
        IsSeparation = 0
    }
    if (IsInvite == 0) {
        IsInvite_info = "跳过助力邀请"
    } else if (IsInvite == 1) {
        IsInvite_info = "助力邀请"
    } else {
        IsInvite_info = "无效参数，改为默认值“跳过助力邀请”"
        IsInvite = 0
    }
    if (IsJoinMember == 0) {
        IsJoinMember_info = "不执行入会"
    } else if (IsJoinMember == 1) {
        IsJoinMember_info = "有新入会店铺则退出脚本"
    } else if (IsJoinMember == 2) {
        IsJoinMember_info = "有新入会店铺则返回，等待刷新别的店铺"
    } else if (IsJoinMember == 3) {
        IsJoinMember_info = "有新入会店铺，等待手动入会"
    } else {
        IsJoinMember_info = "无效参数，改为默认值“不执行入会”"
        IsJoinMember = 0
    }
    console.info(
        "当前设置" + "\n" +
        "启动APP：" + LauchAPPName + "\n" +
        "是否分身：" + IsSeparation_info + "\n" +
        "是否助力：" + IsInvite_info + "\n" +
        "是否入会：" + IsJoinMember_info
    )
    CustomSleep(2, 4, '请稍候…');
    if (IsInvite == 1) {
        //将京口令分段填入，只要里面的特征码即可，分不清什么是特征码的也可以整段放进来，注意用双引号和逗号隔开
        Code = new Array(
            "27:/#317Kx13Fh0gfa@咑k鯨·=·鮗Ap/ρ，✨﹎壹啓ɡμā汾10億!!!!!！ぷ",
            "25:/#00LXa6IMIvlSB@☆しāī京岽逛逛☆，嘿！﹎壹啓ɡμā汾10億!!!!!！ぷ",
            "24:/￥2CEpHBvnD4RQL￥祛→亰岽逛逛GO，☃️﹎壹啓ɡμā汾10億!!!!!！ぷ"
        );//邀请码第一个是助力作者，第二个纯属举例，使用时建议删除
        RunTime = Code.length;
        console.info("共识别到" + RunTime + "个助力码");
        for (var i = 0; i < RunTime; i++) {
            console.log("第" + (i + 1) + "个助力码");
            setClip(Code[i]);
            console.log("助力码写入剪切板");
            if (LauchAPPName == "手动") {
                console.log("请手动打开APP，以便进行下一步");
                while (text("领京豆").findOnce() == null) {
                    if (textMatches(/.*消耗.*爆竹/).exists() | text("立即查看").exists() |
                        app.getAppName(currentPackage()) == "京东" | currentActivity() == "com.jingdong.app.mall.MainFrameActivity") {
                        CustomSleep(1, 3, '请稍候…');
                        break;
                    }
                    console.log("当前应用名:  " + app.getAppName(currentPackage()) + "\n"
                        + "当前活动:  " + currentActivity() + "\n"
                        + "未识别到京东相关界面，继续等待……");
                    CustomSleep(3, 5, '请稍候…');
                }
                console.log("已检测到京东APP，等待下一步");
            }
            else {
                if (IsSeparation == 1) {
                    console.info("打开分身有术Pro，准备调用分身");
                    app.launchApp("分身有术Pro");
                    for (var t = 0; !id("tv_app_name").className("android.widget.TextView").text(LauchAPPName).exists(); t++) {
                        console.log("等待识别分身……");
                        console.log("当前应用名:  " + app.getAppName(currentPackage()) + "\n"
                            + "未识别到<" + LauchAPPName + ">，继续等待……");
                        CustomSleep(3, 5, '请稍候…');
                        if (id("im_close_clear").exists()) {
                            console.log("发现加速弹窗");
                            id("im_close_clear").findOne().click();
                            console.log("关闭加速弹窗");
                        }
                        if (t > 10) {
                            console.log("识别超时，退出当前任务");
                            return;
                        }
                    }
                    if (id("tv_app_name").className("android.widget.TextView").text(LauchAPPName).exists()) {
                        console.log("找到分身<" + LauchAPPName + ">");
                        text(LauchAPPName).findOne().parent().click();
                        console.log("分身已启动，等待活动检测……");
                    }
                }
                else {
                    console.info("打开" + LauchAPPName + "");
                    app.launchApp(LauchAPPName);
                    console.log("等待任务检测……");
                }
            }
            if (text("立即查看").findOne(2000) == null) {
                console.log("等待APP识别助力码");
                var j = 0;
                while (j < 15 | text("立即查看").findOnce() == null) {
                    if (text("立即查看").exists()) {
                        CustomSleep(1, 3, '请稍候…');
                        break;
                    }
                    console.log(j + 1);
                    j++;
                    CustomSleep(1, 1, '请稍候…');
                    if (j == 10) {
                        console.log("未检测到新助力码，尝试再次复制");
                        OutAPP(1000);
                        setClip(Code[i]);
                        console.log("助力码重新写入剪切板");
                        CustomSleep(1, 3, '请稍候…');
                        if (LauchAPPName == "手动") {
                            console.log("请手动打开APP，以便进行下一步");
                            while (text("领京豆").findOnce() == null) {
                                if (textMatches(/.*消耗.*爆竹/).exists() |
                                    app.getAppName(currentPackage()) == "京东" | currentActivity() == "com.jingdong.app.mall.MainFrameActivity") {
                                    CustomSleep(1, 3, '请稍候…');
                                    break;
                                }
                                console.log("当前应用名:  " + app.getAppName(currentPackage()) + "\n"
                                    + "当前活动:  " + currentActivity() + "\n"
                                    + "未识别到京东相关界面，继续等待……");
                                CustomSleep(3, 5, '请稍候…');
                            }
                            console.log("检测到京东APP，等待再次检测");
                        }
                        else {
                            if (IsSeparation == 1) {
                                console.info("打开分身有术Pro，准备调用分身");
                                app.launchApp("分身有术Pro");
                                for (var t = 0; !id("tv_app_name").className("android.widget.TextView").text(LauchAPPName).exists(); t++) {
                                    console.log("等待识别分身……");
                                    console.log("当前应用名:  " + app.getAppName(currentPackage()) + "\n"
                                        + "未识别到<" + LauchAPPName + ">，继续等待……");
                                    CustomSleep(3, 5, '请稍候…');
                                    if (id("im_close_clear").exists()) {
                                        console.log("发现加速弹窗");
                                        id("im_close_clear").findOne().click();
                                        console.log("关闭加速弹窗");
                                    }
                                    if (t > 10) {
                                        console.log("识别超时，退出当前任务");
                                        return;
                                    }
                                }
                                if (id("tv_app_name").className("android.widget.TextView").text(LauchAPPName).exists()) {
                                    console.log("找到分身<" + LauchAPPName + ">");
                                    text(LauchAPPName).findOne().parent().click();
                                    console.log("分身已启动，等待活动检测……");
                                }
                            }
                            else {
                                console.info("打开" + LauchAPPName + "");
                                app.launchApp(LauchAPPName);
                            }
                            console.log("重启APP成功，等待再次检测");
                            CustomSleep(1, 3, '请稍候…');
                        }
                    }
                    if (j > 15) {
                        console.error("超时未检测到新助力码，跳过助力任务");
                        CustomSleep(1, 3, '请稍候…');
                        if (i < RunTime - 1) {
                            console.log("退出当前APP，准备第" + (i + 2) + "个助力码");
                            OutAPP(2000);
                        }
                        break;
                    }
                }
                if (j > 15) {
                    //超时则跳出当前助力任务
                    console.info("跳过当前助力");
                    continue;
                }
            }
            setScreenMetrics(1440, 3120);//基于分辨率1440*3120的点击
            if (text("立即查看").exists()) {
                console.log("立即查看");
                text("立即查看").findOnce().click();
                while (!textContains("的助力邀请").exists()) {
                    CustomSleep(2, 4, '请稍候…');
                    console.log("等待加载……");
                }
                CustomSleep(1, 3, '请稍候…');
                click(720, 1845);
                console.log("为TA助力");
                CustomSleep(2, 4, '请稍候…');
                console.log("助力完成");
            }
            setScreenMetrics(device.width, device.height);//恢复本机分辨率
            //最后一次助力不返回首页，以便进行下一个任务
            if (i < RunTime - 1) {
                home();
                console.log("准备第" + (i + 2) + "个助力码");
            }
            else {
                console.log("当前账户已助力完成，返回首页");
                back();
                CustomSleep(0.5, 0.5, '请稍候…');
                back();
            }
        }
    }
    if (IsInvite == 0) {
        console.info("跳过活动助力");
        if (LauchAPPName == "手动") {
            console.log("请手动打开APP，以便进行下一步");
            while (text("领京豆").findOnce() == null) {
                if (textMatches(/.*消耗.*爆竹/).exists() |
                    app.getAppName(currentPackage()) == "京东" | currentActivity() == "com.jingdong.app.mall.MainFrameActivity") {
                    CustomSleep(1, 3, '请稍候…');
                    break;
                }
                console.log("当前应用名:  " + app.getAppName(currentPackage()) + "\n"
                    + "当前活动:  " + currentActivity() + "\n"
                    + "未识别到京东相关界面，继续等待……");
                CustomSleep(3, 5, '请稍候…');
            }
            console.log("已检测到京东APP，等待下一步");
        }
        else {
            if (IsSeparation == 1) {
                console.info("打开分身有术Pro，准备调用分身");
                app.launchApp("分身有术Pro");
                for (var i = 0; !text(LauchAPPName).exists(); i++) {
                    console.log("等待识别分身……");
                    CustomSleep(3, 5, '请稍候…');
                    if (i > 10) {
                        console.log("识别超时，退出当前任务");
                        return;
                    }
                }
                if (text(LauchAPPName).exists()) {
                    text(LauchAPPName).findOne().parent().click();
                    console.log("分身已启动，等待活动检测……");
                }
            }
            else {
                console.info("打开" + LauchAPPName + "");
                app.launchApp(LauchAPPName);
                console.log("等待活动检测……");
            }
        }
        if (!text("累计任务奖励").exists()) {
            if (!textMatches(/.*消耗.*爆竹/).exists()) {
                //进入活动
                console.log("寻找活动入口……");
                if (LauchAPPName == "手动") {
                    for (; ;) {
                        if (textMatches(/.*消耗.*爆竹/).exists()) {
                            CustomSleep(1, 3, '请稍候…');
                            break;
                        }
                        console.log("手动进入活动界面后，脚本将继续");
                        CustomSleep(5, 8, '请稍候…');
                    }
                }
                else {
                    if (!text("累计任务奖励").exists()) {
                        if (!textMatches(/.*消耗.*爆竹/).exists()) {
                            for (var i = 0; !textMatches(/.*消耗.*爆竹/).exists(); i++) {
                                console.log("未识别到活动页面，尝试通过首页浮层进入");
                                if (text("首页").exists()) {
                                    let into = descContains("浮层活动").findOne(20000);
                                    CustomSleep(2, 4, '请稍候…');
                                    if (into == null) {
                                        console.log("无法找到京东活动入口，退出当前任务");
                                        return;
                                    }
                                    click(into.bounds().centerX(), into.bounds().centerY());
                                    click(into.bounds().centerX(), into.bounds().centerY());
                                    CustomSleep(3, 5, '请稍候…');
                                }
                                if (i > 10) {
                                    console.log("识别超时，退出当前任务");
                                    return;
                                }
                                CustomSleep(3, 5, '请稍候…');
                            }
                            if (textMatches(/.*消耗.*爆竹/).exists()) {
                                console.log("已检测到活动页面");
                                PageStatus = 1//进入活动页面，未打开任务列表
                            }
                        }
                        else {
                            console.log("检测到活动页面");
                            PageStatus = 1//进入活动页面，未打开任务列表
                        }
                    }
                    else {
                        console.log("检测到任务列表");
                        PageStatus = 2//已打开任务列表
                    }
                }
                console.info("进入活动页面");
            }
        }
    }
    //确保退出活动界面及当前账号
    function OutAPP(SleepTime) {
        if (SleepTime == null) {
            SleepTime = 100
        }
        back();
        CustomSleep(0.5, 0.5, '请稍候…');
        back();
        sleep(SleepTime);
    }
 
    CustomSleep(2, 4, '请稍候…');
    if (!text("累计任务奖励").exists()) {
        if (!textMatches(/.*消耗.*爆竹/).exists()) {
            for (var i = 0; !textMatches(/.*消耗.*爆竹/).exists(); i++) {
                console.log("未识别到活动页面，尝试通过首页浮层进入");
                if (text("首页").exists()) {
                    let into = descContains("浮层活动").findOne(20000);
                    CustomSleep(2, 4, '请稍候…');
                    if (into == null) {
                        console.log("无法找到京东活动入口，退出当前任务");
                        return;
                    }
                    click(into.bounds().centerX(), into.bounds().centerY());
                    click(into.bounds().centerX(), into.bounds().centerY());
                    CustomSleep(3, 5, '请稍候…');
                }
                if (i > 10) {
                    console.log("识别超时，退出当前任务");
                    return;
                }
                CustomSleep(3, 5, '请稍候…');
            }
            if (textMatches(/.*消耗.*爆竹/).exists()) {
                console.log("已检测到活动页面");
                PageStatus = 1//进入活动页面，未打开任务列表
            }
        }
        else {
            console.log("检测到活动页面");
            PageStatus = 1//进入活动页面，未打开任务列表
        }
    }
    else {
        console.log("检测到任务列表");
        PageStatus = 2//已打开任务列表
    }
    if (PageStatus != 2) {
        CustomSleep(2, 4, '请稍候…');
        console.log("成功进入活动界面");
        console.log("等待加载弹窗……");
        while (textContains("继续环游").exists() | textContains("立即抽奖").exists() | textContains("开启今日环游").exists() | textContains("点我签到").exists() | textContains("开心收下").exists()) {
            CustomSleep(1, 3, '请稍候…');
            if (textContains("继续环游").exists()) {
                console.log("继续环游");
                textContains("继续环游").findOne().click();
                CustomSleep(0.5, 1.5, '请稍候…');
            } else if (textContains("立即抽奖").exists()) {
                console.log("关闭立即抽奖");
                textContains("立即抽奖").findOne().parent().child(1).click();
                CustomSleep(0.5, 1.5, '请稍候…');
            } else if (textContains("开启今日环游").exists()) {
                console.log("开启今日环游");
                textContains("开启今日环游").findOne().click();
                CustomSleep(1, 3, '请稍候…');
            } else if (textContains("点我签到").exists()) {
                console.log("点我签到");
                textContains("点我签到").findOne().parent().click();
                CustomSleep(1, 3, '请稍候…');
                textContains("开心收下").waitFor();
                textContains("开心收下").findOne().parent().click();
                CustomSleep(1, 3, '请稍候…');
            } else if (text("开心收下开心收下").exists()) {
                console.log("开心收下");
                text("开心收下开心收下").findOne().click();
                CustomSleep(1, 3, '请稍候…');
            } else if (textContains("开心收下").exists()) {
                console.log("开心收下");
                textContains("开心收下").findOne().parent().click();
                CustomSleep(1, 3, '请稍候…');
            } else {
                console.log("暂无可处理弹窗");
                break;
            }
            CustomSleep(1, 3, '请稍候…');
        }
        console.log("如还有弹窗，请手动处理");
        CustomSleep(3, 5, '请稍候…');
 
        if (text("立即前往").exists()) {
            console.log("前往签到");
            textContains("立即前往").findOne().parent().click();
            CustomSleep(0.5, 1.5, '请稍候…');
            console.log("点我签到");
            textContains("点我签到").findOne().parent().click();
            CustomSleep(1, 3, '请稍候…');
            textContains("开心收下").waitFor();
            textContains("开心收下").findOne().parent().click();
            CustomSleep(1, 3, '请稍候…');
        }
        if (text("爆竹满了~~").exists()) {
            console.log("爆竹已存满");
            text("爆竹满了~~").findOne().parent().parent().child(2).click();
            console.log("爆竹领取成功");
            CustomSleep(2, 4, '请稍候…');
        }
        else if (textContains("后满").exists()) {
            textContains("后满").findOne().parent().parent().child(2).click();
            console.log("爆竹领取成功");
            CustomSleep(2, 4, '请稍候…');
        }
 
        if (text("放入我的＞我的优惠券").exists()) {
            text("放入我的＞我的优惠券").findOne().parent().parent().child(0).click();
            CustomSleep(1, 3, '请稍候…');
        }
        console.info("准备打开任务列表");
        let taskListButton = textMatches(/.*消耗.*爆竹/).findOne(10000)
        if (!taskListButton) {
            console.log("未能识别关键节点，退出当前任务");
            return;
        }
        setScreenMetrics(1440, 3120);//基于分辨率1440*3120的点击
        click(1275, 2100);
        click(1275, 2100);
        CustomSleep(2, 4, '请稍候…');
        setScreenMetrics(device.width, device.height);//恢复本机分辨率
 
        for (var i = 0; !text("累计任务奖励").exists(); i++) {
            console.log("未识别到任务列表，请手动打开")
            CustomSleep(3, 5, '请稍候…');
            if (i >= 10) {
                console.log("未按时打开任务列表，退出当前任务");
                return;
            }
        }
    }
    console.log("寻找未完成任务……");
    while (true) {
        if (textContains("去组队可得").exists()) {
            let task1 = textMatches(/.*去组队可得.*/).find()
            if (task1.empty()) {
                sleep(100);
            }
            else {
                let task1Button, task1Text
                let task1img = captureScreen();
                for (let i = 0; i < task1.length; i++) {
                    let task1item = task1[i]
                    task1Text = task1item.text();
                    task1Button = task1item.parent().child(3);
                    let task1b = task1item.bounds()
                    let task1color = images.pixel(task1img, task1b.left + task1b.width() / 8, task1b.top + task1b.height() / 2)
                    console.info("识别任务<" + task1item.parent().child(1).text() + ">");
                    console.error("识别任务状态(" + colors.red(task1color) + "," + colors.green(task1color) + "," + colors.blue(task1color) + ")");
                    if (colors.isSimilar(task1color, "#fff2da", 60, "diff") | colors.isSimilar(task1color, "#caa282", 60, "diff") | task1color == -3366) {
                        console.log("进行", task1Text);
                        task1Button.click();
                        CustomSleep(3, 5, '请稍候…');
                        console.log("领取成功");
                    }
                }
            }
        }
        let taskButtons = textMatches(/.*浏览.*s.*|.*浏览.*秒.*|.*累计浏览.*|.*浏览即可得.*|.*浏览并关注可得.*|.*浏览可得.*|.*成功入会.*|.*小程序.*|.*每日6-9点打卡可得.*|.*点击首页浮层可得.*|.*品牌墙店铺.*|.*玩AR游戏可得.*爆竹.*/).find()
        if (taskButtons.empty()) {
            console.log("未找到合适的任务，退出");
            CustomSleep(3, 5, '请稍候…');
            break;
        }
        let taskButton, taskText
        let img = captureScreen()
        for (let i = 0; i < taskButtons.length; i++) {
            let item = taskButtons[i]
            taskText = item.text();
            item = item.parent().child(3);
            let b = item.bounds()
            let color = images.pixel(img, b.left + b.width() / 8, b.top + b.height() / 2)
            console.info("识别任务<" + item.parent().child(1).text() + ">");
            console.error("识别任务状态(" + colors.red(color) + "," + colors.green(color) + "," + colors.blue(color) + ")");
            if (colors.isSimilar(color, "#b5b5b5", 40, "diff")) {
                console.log("任务已完成，即将识别下一任务");
            }
            else {
                //跳过任务
                //if (taskText.match(/成功入会/)) continue
                //if (taskText.match(/品牌墙店铺/)) continue
                //if (taskText.match(/小程序/)) continue
                //if (taskText.match(/加购/)) continue
                if (taskText.match(/成功入会/) && IsJoinMember == 0) {
                    console.log("识别到入会任务，当前设置为<不执行入会>，即将进入下一任务");
                    CustomSleep(1, 3, '请稍候…');
                    continue;
                }
                taskButton = item;
                break;
            }
        }
        img.recycle();//调用recycle回收
        if (!taskButton) {
            console.log("未找到可自动完成的任务，退出当前任务");
            console.log("互动任务需要手动完成");
            break;
        }
 
        function timeTask() {
            taskButton.click();
            CustomSleep(3, 5, '请稍候…');
            console.log("等待浏览任务完成……");
            let c = 0
            while (c < 15) { // 15秒，防止死循环
                let finish_reg = /获得.*?爆竹|浏览完成|已达上限/
                if ((textMatches(finish_reg).exists() || descMatches(finish_reg).exists())) { // 等待已完成出现，有可能失败
                    CustomSleep(1, 3, '请稍候…');
                    break;
                }
                CustomSleep(1, 1, '请稍候…');
                c++;
                if (c == 3 | c == 6 | c == 12) {
                    console.log("已等待" + c + "秒");
                    //财富岛任务无法直接返回，只能跳转返回
                    if (app.getAppName(currentPackage()) == "京喜") {
                        if (LauchAPPName == "手动") {
                            console.log("请手动返回任务界面，以便进行下一步");
                            while (text("累计任务奖励").findOnce() == null) {
                                if (textMatches(/.*消耗.*爆竹/).exists() |
                                    app.getAppName(currentPackage()) == "京东" | currentActivity() == "com.jingdong.app.mall.MainFrameActivity") {
                                    break;
                                }
                                console.log("当前应用名:  " + app.getAppName(currentPackage()) + "\n"
                                    + "当前活动:  " + currentActivity() + "\n"
                                    + "未识别到京东相关界面，继续等待……");
                                CustomSleep(3, 5, '请稍候…');
                            }
                            console.log("已检测到京东APP，等待下一步");
                        }
                        else {
                            if (IsSeparation == 1) {
                                console.info("打开分身有术Pro，准备调用分身");
                                app.launchApp("分身有术Pro");
                                for (var i = 0; !text(LauchAPPName).exists(); i++) {
                                    console.log("等待识别分身……");
                                    CustomSleep(3, 5, '请稍候…');
                                    if (i > 10) {
                                        console.log("识别超时，退出当前任务");
                                        return;
                                    }
                                }
                                if (text(LauchAPPName).exists()) {
                                    text(LauchAPPName).findOne().parent().click();
                                    console.log("分身已启动，等待活动检测……");
                                }
                            }
                            else {
                                console.info("打开" + LauchAPPName + "");
                                app.launchApp(LauchAPPName);
                                console.log("等待活动检测……");
                            }
                        }
                    }
                }
            }
            if (c >= 15) {
                console.log("超时，即将返回");
            }
            else {
                console.log("浏览时长任务完成");
            }
        }
 
        function itemTask(cart) {
            taskButton.click();
            CustomSleep(1, 3, '请稍候…');
            console.log("等待进入商品列表……");
            textEndsWith("4个商品领爆竹").waitFor();//当前页浏览加购4个商品领爆竹|当前页点击浏览4个商品领爆竹
            if (!textContains('.jpg!q70').exists()) {
                console.log("模式2");
                for (var i = 0; i < 4; i++) {
                    let Model2items = textEndsWith("4个商品领爆竹").findOne();
                    if (cart) {
                        console.log("第" + (i + 1) + "次加购");
                        console.log('待加购');
                        CustomSleep(0.5, 1.5, '请稍候…');
                        if (!Model2items.parent().parent()) {
                            console.error("界面异常，跳过此商品");
                            continue;
                        }
                        Model2items.parent().parent().child(2).child(i).child(4).click();
                    } else {
                        console.log("第" + (i + 1) + "次浏览");
                        Model2items.parent().parent().child(2).child(i).child(4).click();
                    }
                    CustomSleep(3, 5, '请稍候…', true);
                    for (var ii = 0; !textEndsWith("4个商品领爆竹").exists(); ii++) {
                        if (ii == 0) {
                            console.log("返回");
                        } else {
                            console.log("再次返回");
                        }
                        back();
                        CustomSleep(2, 4, '请稍候…');
                        if (ii > 4) {
                            console.error("任务异常，退出当前账号");
                            home();
                            return;
                        }
                    }
                    if (i >= 3) {
                        break;
                    }
                }
            }
            else {
                console.log("模式1");
                for (var i = 0; i < 4; i++) {
                    let Model1items = textContains('.jpg!q70').find();
                    if (cart) {
                        console.log("第" + (i + 1) + "次加购");
                        let Model1tmp = Model1items[i].parent().parent();
                        console.log('待加购');
                        CustomSleep(0.5, 1.5, '请稍候…');
                        if (!Model1tmp) {
                            console.error("界面异常，跳过此商品");
                            continue;
                        }
                        Model1tmp.child(Model1tmp.childCount() - 1).click();
                    } else {
                        console.log("第" + (i + 1) + "次浏览");
                        Model1items[i].parent().parent().child(4).click();
                    }
                    CustomSleep(3, 5, '请稍候…', true);
                    for (var ii = 0; !textEndsWith("4个商品领爆竹").exists(); ii++) {
                        if (ii == 0) {
                            console.log("返回");
                        } else {
                            console.log("再次返回");
                        }
                        back();
                        CustomSleep(2, 4, '请稍候…');
                        if (ii > 4) {
                            console.error("加购任务异常，退出当前账号");
                            home();
                            return;
                        }
                    }
                    if (i >= 3) {
                        break;
                    }
                }
            }
            console.log("浏览商品任务完成");
        }
 
        if (taskText.match(/浏览.*s|浏览.*秒/)) {
            console.log("进行", taskText);
            timeTask();
        } else if (taskText.match(/点击首页浮层可得/)) {
            console.log("进行", taskText);
            taskButton.click();
            CustomSleep(2, 4, '请稍候…');
            /* 如果任务按钮为去完成，则此处应该有弹窗 */
            if (!text("首页").exists()) {
                console.log("未识别到首页，等待5秒待跳转");
                if (text("首页").findOne(5000) == null) {
                    console.log("未识别到首页，退出活动重进");
                    back();
                    CustomSleep(0.5, 0.5, '请稍候…');
                    back();
                }
            }
            if (!text("累计任务奖励").exists()) {
                if (!textMatches(/.*消耗.*爆竹/).exists()) {
                    for (var i = 0; !textMatches(/.*消耗.*爆竹/).exists(); i++) {
                        console.log("未识别到活动页面，尝试通过首页浮层进入");
                        if (text("首页").exists()) {
                            let into = descContains("浮层活动").findOne(20000);
                            CustomSleep(2, 4, '请稍候…');
                            if (into == null) {
                                console.log("无法找到京东活动入口，退出当前任务");
                                return;
                            }
                            click(into.bounds().centerX(), into.bounds().centerY());
                            click(into.bounds().centerX(), into.bounds().centerY());
                            CustomSleep(3, 5, '请稍候…');
                        }
                        if (i > 10) {
                            console.log("识别超时，退出当前任务");
                            return;
                        }
                        if (text("累计任务奖励").exists()) {
                            console.log("已检测到任务页面");
                            break;
                        }
                        CustomSleep(3, 5, '请稍候…');
                    }
                    if (textMatches(/.*消耗.*爆竹/).exists()) {
                        console.log("已检测到活动页面");
                        PageStatus = 1//进入活动页面，未打开任务列表
                    }
                }
                else {
                    console.log("检测到活动页面");
                    PageStatus = 1//进入活动页面，未打开任务列表
                }
                if (!text("累计任务奖励").exists()) {
                    console.info("准备打开任务列表");
                    let taskListButton = textMatches(/.*消耗.*爆竹/).findOne(10000)
                    if (!taskListButton) {
                        console.log("未能识别关键节点，退出当前任务");
                        return;
                    }
                    setScreenMetrics(1440, 3120);//基于分辨率1440*3120的点击
                    click(1275, 2100);
                    click(1275, 2100);
                    CustomSleep(2, 4, '请稍候…');
                    setScreenMetrics(device.width, device.height);//恢复本机分辨率
                }
                for (var i = 0; !text("累计任务奖励").exists(); i++) {
                    console.log("未识别到任务列表，请手动打开")
                    CustomSleep(3, 5, '请稍候…');
                    if (i >= 10) {
                        console.log("未按时打开任务列表，退出当前任务");
                        return;
                    }
                }
            }
            else {
                console.log("领取奖励");
            }
            console.log("任务完成");
        } else if (taskText.match(/品牌墙店铺/)) {
            console.log("进行", taskText);
            taskButton.click();
            CustomSleep(1, 3, '请稍候…');
            if (textContains("后满").exists()) {
                var task2 = textContains("后满").findOne().parent().parent()
                for (var i = 0; i < 3; i++) {
                    console.log("第" + (i + 1) + "个店铺")
                    task2.child(task2.childCount() - 3).child(0).child(1).child(i).click();
                    CustomSleep(1, 3, '请稍候…');
                    for (var ii = 0; !textContains("后满").exists(); ii++) {
                        console.log("返回")
                        back();
                        CustomSleep(1, 3, '请稍候…');
                        if (ii > 4) {
                            console.log("返回活动界面，退出当前任务");
                            return;
                        }
                    }
                }
                task2.child(task2.childCount() - 1).click();//返回
                CustomSleep(1, 3, '请稍候…');
                console.info("准备打开任务列表");
                let taskListButton = textMatches(/.*消耗.*爆竹/).findOne(10000)
                if (!taskListButton) {
                    console.log("未能识别关键节点，退出当前任务");
                    return;
                }
                setScreenMetrics(1440, 3120);//基于分辨率1440*3120的点击
                click(1275, 2100);
                click(1275, 2100);
                CustomSleep(2, 4, '请稍候…');
                setScreenMetrics(device.width, device.height);//恢复本机分辨率
 
                for (var i = 0; !text("累计任务奖励").exists(); i++) {
                    console.log("未识别到任务列表，请手动打开")
                    CustomSleep(3, 5, '请稍候…');
                    if (i >= 10) {
                        console.log("未按时打开任务列表，退出当前任务");
                        return;
                    }
                }
            }
            else {
                console.log("未能识别关键节点，重进活动页面");
                if (!text("首页").exists()) {
                    console.log("未识别到首页，等待5秒待跳转");
                    if (text("首页").findOne(5000) == null) {
                        console.log("未识别到首页，退出活动重进");
                        back();
                        CustomSleep(0.5, 0.5, '请稍候…');
                        back();
                    }
                }
                if (!text("累计任务奖励").exists()) {
                    if (!textMatches(/.*消耗.*爆竹/).exists()) {
                        for (var i = 0; !textMatches(/.*消耗.*爆竹/).exists(); i++) {
                            console.log("未识别到活动页面，尝试通过首页浮层进入");
                            if (text("首页").exists()) {
                                let into = descContains("浮层活动").findOne(20000);
                                CustomSleep(2, 4, '请稍候…');
                                if (into == null) {
                                    console.log("无法找到京东活动入口，退出当前任务");
                                    return;
                                }
                                click(into.bounds().centerX(), into.bounds().centerY());
                                click(into.bounds().centerX(), into.bounds().centerY());
                                CustomSleep(3, 5, '请稍候…');
                            }
                            if (i > 10) {
                                console.log("识别超时，退出当前任务");
                                return;
                            }
                            CustomSleep(3, 5, '请稍候…');
                        }
                        if (textMatches(/.*消耗.*爆竹/).exists()) {
                            console.log("已检测到活动页面");
                            PageStatus = 1//进入活动页面，未打开任务列表
                        }
                    }
                    else {
                        console.log("检测到活动页面");
                        PageStatus = 1//进入活动页面，未打开任务列表
                    }
                    console.info("准备打开任务列表");
                    let taskListButton = textMatches(/.*消耗.*爆竹/).findOne(10000)
                    if (!taskListButton) {
                        console.log("未能识别关键节点，退出当前任务");
                        return;
                    }
                    setScreenMetrics(1440, 3120);//基于分辨率1440*3120的点击
                    click(1275, 2100);
                    click(1275, 2100);
                    CustomSleep(2, 4, '请稍候…');
                    setScreenMetrics(device.width, device.height);//恢复本机分辨率
 
                    for (var i = 0; !text("累计任务奖励").exists(); i++) {
                        console.log("未识别到任务列表，请手动打开")
                        CustomSleep(3, 5, '请稍候…');
                        if (i >= 10) {
                            console.log("未按时打开任务列表，退出当前任务");
                            return;
                        }
                    }
                }
            }
        } else if (taskText.match(/累计浏览/)) {
            console.log("进行", taskText);
            if (taskText.match(/加购/)) {
                itemTask(true);
            }
            else {
                itemTask(false);
            }
        } else if (taskText.match(/小程序/)) {
            console.log("进行", taskText);
            taskButton.click();
            CustomSleep(3, 5, '请稍候…');
            while (id("ffp").exists() | text("取消").exists()) {
                if (id("ffp").exists()) {
                    id("ffp").findOne().click();
                    console.log("跳转微信异常，准备返回");
                    CustomSleep(1, 3, '请稍候…');
                } else if (text("取消").exists()) {
                    text("取消").findOne().click();
                    console.log("取消");
                    CustomSleep(1, 3, '请稍候…');
                }
                CustomSleep(1, 3, '请稍候…');
            }
            console.log("任务完成");
        } else if (taskText.match(/成功入会/)) {
            console.log("进行", taskText);
            taskButton.click();
            CustomSleep(3, 5, '请稍候…');
            if (textContains("确认授权并加入店铺会员").exists()) {
                if (IsJoinMember == 2) {
                    console.log("当前店铺未入会，跳过");
                }
                else if (IsJoinMember == 1) {
                    console.log("涉及个人隐私，请手动加入店铺会员或者忽略加入会员任务");
                    return;
                }
                else if (IsJoinMember == 3) {
                    console.log("当前店铺未入会，等待手动");
                    sleep(8000);
                }
            }
            else {
                console.info("已是当前店铺会员");
                console.log("任务完成");
            }
        } else if (taskText.match(/玩AR游戏可得|每日6-9点打卡/)) {
            console.log("进行", taskText);
            taskButton.click();
            CustomSleep(2, 4, '请稍候…');
        } else if (taskText.match(/浏览并关注可得|浏览可得|浏览即可得/)) {
            console.log("进行", taskText);
            let taskItemText = taskButton.parent().child(1).text()
            if (taskItemText.match(/种草城/)) {
                taskButton.click();
                CustomSleep(5, 8, '请稍候…');
                if (text("互动种草城").exists()) {
                    if (textContains("/3)").exists()) {
                        for (var i = 0; i < 3; i++) {
                            console.log("第" + (i + 1) + "次浏览店铺");
                            textContains("/3)").findOnce().parent().parent().child(2).click();
                            CustomSleep(1, 3, '请稍候…');
                            console.log("返回");
                            back();
                            CustomSleep(2, 4, '请稍候…');
                            while (!text("互动种草城").exists()) {
                                console.log("再次返回");
                                back();
                                CustomSleep(2, 4, '请稍候…');
                            }
                        }
                    }
                }
            }
            else {
                taskButton.click();
                CustomSleep(2, 4, '请稍候…');
            }
            console.log("普通浏览任务完成");
        }
 
        for (var i = 0; text("累计任务奖励").findOnce() == null; i++) {
            console.log("返回");
            back();
            CustomSleep(1, 3, '请稍候…');
            if (i == 5) {
                console.log("无法返回任务界面，退出当前任务");
                return;
            }
            if (text("领京豆").exists() && text("首页").exists()) {
                console.log("发现首页，尝试退出并返回原任务列表");
                OutAPP(100);
                CustomSleep(2, 4, '请稍候…');
                if (text("累计任务奖励").exists()) {
                    console.log("已返回任务列表");
                    break;
                }
            }
        }
        console.info("准备下一个任务");
        if (textContains("重新连接").exists()) {
            console.info("尝试重新连接");
            textContains("重新连接").findOne().click();
            CustomSleep(0.5, 1.5, '请稍候…');
        }
        CustomSleep(1, 3, '请稍候…');
    }
    if (text("当前进度10/10").exists()) {
        console.log("领取累计任务奖励");
        for (var i = 1; text("当前进度10/10").exists() && i < 4; i++) {
            console.log("第" + i + "个宝箱");
            text("当前进度10/10").findOne().parent().child(2).child(i).click();
            CustomSleep(0.5, 1.5, '请稍候…');
            if (text("放入我的＞我的优惠券").exists()) {
                console.log("发现优惠券")
                text("放入我的＞我的优惠券").findOne().parent().parent().child(0).click();
                sleep(100);
            }
            if (textContains("开心收下").exists()) {
                console.log("开心收下")
                textContains("开心收下").findOne().parent().click();
                sleep(100);
            }
            CustomSleep(0.5, 1.5, '请稍候…');
        }
        console.log("累计任务奖励领取完毕");
        CustomSleep(1, 3, '请稍候…');
    }
    CustomSleep(0.5, 1.5, '请稍候…');
    back();
    CustomSleep(0.5, 0.5, '请稍候…');
    back();
}
 
function CleanCache(LauchAPPName, Isclean) {
    if (LauchAPPName == "分身有术Pro" && Isclean == 1) {
        console.info("打开分身有术Pro，准备清理缓存");
        app.launchApp("分身有术Pro");
        console.log("等待清理");
        for (var i = 0; !id("iv_home_clean").exists() && i < 15; i++) {
            CustomSleep(1, 3, '请稍候…');
            if (i == 5 | i == 10) {
                console.log("已等待" + i + "秒");
            }
            if (id("iv_home_clean").exists()) {
                id("iv_home_clean").findOne().click();
                console.log("加速完毕");
                CustomSleep(3, 5, '请稍候…');
                break;
            }
        }
        if (i >= 15) {
            console.error("识别超时，未能完成加速");
        }
        if (id("im_close_clear").exists()) {
            CustomSleep(2, 4, '请稍候…');
            id("im_close_clear").findOne().click();
            console.log("关闭加速弹窗");
        }
    }
    else {
        console.error("参数不符，退出清理任务");
    }
}
 
//自定义延迟
//minNum~maxNum：延迟范围
//msg：提示消息
//scroll：是否自动滚屏
function CustomSleep(minNum, maxNum, msg, scroll) {
    console.info(msg);
    if (maxNum > 0 && maxNum >= minNum) {
        var sleeptimes = parseInt(random(minNum * 1000, maxNum * 1000), 10);
        var tick = 1000;
        if (sleeptimes > tick) {
            for (var i = 0; i < sleeptimes; i += tick) {
                console.verbose("……【" + (100 - parseInt((sleeptimes - i) * 100 / (sleeptimes), 10)) + "%】……");
                var sleeptick = Math.min(tick, sleeptimes - i);
                sleep(sleeptick);
                if (scroll && i % 3 == 1) scrollDown();
            }
        }
        else {
            sleep(sleeptimes);
            if (scroll) scrollDown();
        }
        console.verbose("……【100%】……");
    }
}
//自定义返回
function CustomBack() {
    back();
    CustomSleep(1, 3, "返回中");
}
//自定义结束任务
function CustomExit() {
    CustomSleep(1, 3, "脚本即将终止运行");
    exit();
}
