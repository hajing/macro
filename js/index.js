$(document).ready(() => {
    const init = () => {
        const nonTargetYears = [];
        const targetYears = [];
        const handlerData = {
            target: {
                2001: [],
                2004: [],
                2008: [],
                2014: [],
            },
            nonTarget: [],
        };
        const duration = 0.7;
        const fillOpacity = 0.2;

        // 初始化目标年份 2001、2004、2008、2014 数组
        for (let year = 1996; year <= 2020; year += 1) {
            if ([2001, 2004, 2008, 2014].includes(year)) {
                targetYears.push(year);
            } else {
                nonTargetYears.push(year);
            }
        }

        // 获取所有分组数据并筛选出 2001、2004、2008、2014 相关分组
        $("g").each(function () {
            const id = $(this).attr("id");
            if (id) {
                const targetYear = targetYears.find((ele) => id.includes(ele));
                const nonTargetYear = targetYear ?
                    null :
                    nonTargetYears.find((ele) => id.includes(ele));
                if (targetYear) {
                    handlerData.target[targetYear].push(this);
                }
                if (nonTargetYear) {
                    handlerData.nonTarget.push(this);
                }
            }
        });
        console.log(handlerData)

        // 设置其它分组透明度为 fillOpacity
        const greyOther = (currentYear) => {
            // $("#Description").load("../assets/svg/03-For2001.svg");

            gsap
                .to("#Description", {
                    duration,
                    opacity: 0,
                    display: "none",
                })
                .then(() => {
                    // $("#Description").load("../assets/svg/03-For2001.svg");
                });



            const {
                target,
                nonTarget
            } = handlerData;

            Object.keys(target).forEach((year) => {
                if (year !== currentYear) {
                    target[year].forEach((ele) => {
                        const id = $(ele).attr("id");
                        // 粉红花瓣的特殊处理，分组合理的话此步骤可省略
                        const fillOpacityValue = id.includes('Soil-Stocks-2') ? 0.9 : fillOpacity
                        gsap.to(ele, {
                            duration,
                            fillOpacity: fillOpacityValue
                        });
                    });
                }
            });

            nonTarget.forEach((ele) => {
                const id = $(ele).attr("id");
                // 粉红花瓣的特殊处理，分组合理的话此步骤可省略
                const fillOpacityValue = id.includes('Soil-Stocks-2') ? 0.9 : fillOpacity
                gsap.to(ele, {
                    duration,
                    fillOpacity: fillOpacityValue
                });
            });

            // 特殊元素的处理
            gsap.to("#GaussianBlurring", {
                duration,
                fillOpacity: 0.9
            });

            // 高亮当前叶片
            $(`#_${currentYear}-Soil-Stocks`)
                .clone(false)
                .removeAttr("id")
                .attr('class', "soil-clone")
                .appendTo($("#_2020-Soil-Stocks-2"));
            $(`#_${currentYear}-Soil-Density`)
                .clone(false)
                .removeAttr("id")
                .attr('class', "soil-clone")
                .appendTo($("#_2020-Soil-Stocks-2"));
            gsap.to(".soil-clone", {
                duration,
                opacity: 1
            });
        };

        // 设置全部分组透明度为1
        const showAll = () => {
            gsap.to("#Description", {
                duration,
                opacity: 1,
                display: "block"
            });

            const {
                target,
                nonTarget
            } = handlerData;

            Object.keys(target).forEach((year) => {
                target[year].forEach((ele) => {
                    gsap.to(ele, {
                        duration,
                        fillOpacity: 1
                    });
                });
            });

            nonTarget.forEach((ele) => {
                gsap.to(ele, {
                    duration,
                    fillOpacity: 1
                });
            });

            // 特殊元素的处理
            gsap.to("#GaussianBlurring", {
                duration,
                fillOpacity: 1
            });

            // 移除高亮的叶片
            $(".soil-clone").remove()
        };

        // issue: 因为存在后一个svg分组覆盖前一个分组的情况，所以无法精确的使用svg元素触发(即花瓣触发)，临时改用文字，建议后期明确分组

        // 处理 2001 年
        // 非 2001 相关数据透明度变化为 fillOpacity
        $("#_2001").mouseover(() => {
            greyOther("2001");
        });
        // 鼠标离开 2001 后设置所有分组的 fillOpacity 为1
        $("#_2001").mouseleave(() => {
            showAll();
        });

        // 处理 2004 年
        // 非 2004 相关数据透明度变化为 fillOpacity
        $("#_2004").mouseover(() => {
            greyOther("2004");
        });
        // 鼠标离开 2004 后设置所有分组的 fillOpacity 为1
        $("#_2004").mouseleave(() => {
            showAll();
        });

        // 处理 2008 年
        // 非 2008 相关数据透明度变化为 fillOpacity
        $("#_2008").mouseover(() => {
            greyOther("2008");
        });
        // 鼠标离开 2008 后设置所有分组的 fillOpacity 为1
        $("#_2008").mouseleave(() => {
            showAll();
        });

        // 处理 2014 年
        // 非 2014 相关数据透明度变化为 fillOpacity
        $("#_2014").mouseover(() => {
            greyOther("2014");
        });
        // 鼠标离开 2014 后设置所有分组的 fillOpacity 为1
        $("#_2014").mouseleave(() => {
            showAll();
        });
    };

    // 一切的开始
    $("#macroContainer").load("../assets/svg/MacroDefault.svg", () => init());
});
