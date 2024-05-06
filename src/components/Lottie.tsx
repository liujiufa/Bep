import React, { useRef, useEffect, useMemo, forwardRef, useImperativeHandle, Ref } from 'react';
import lottie, { AnimationItem } from 'lottie-web';

// 渲染类型
type rendererType = 'svg' | 'canvas' | 'html';

/**
 * 参数属性
 *
 * @interface IProps
 */
interface IProps {
  renderer?: rendererType; // 设置渲染器类型
  loop?: boolean; // 是否循环
  autoPlay?: boolean; //是否自动播放
  animationData?: Record<string, any>; //  AE 或者 Lottie 导出的JSON数据
  imageAssetsFolder?: string; // 从animationData获取数据时，调整assets图片路径
  path?: string; // AE或者Lottie导出的JSON文件路径。（animationData和path互斥）
  rendererSettings?: rendererSettingsType;
  initLoad?: Function; // 动画加载之后处理函数
}
/**
 * rendererSettings options
 *
 * @interface rendererSettingsType
 */
interface rendererSettingsType {
  width?: number;
  height?: number;
  context?: CanvasRenderingContext2D; // canvas 上下文, only canvas 2d
  scaleMode?: string; // 刻度模式 noScale
  clearCanvas?: boolean; // 是否清除画布
  progressiveLoad?: boolean; // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
  hideOnTransparent?: boolean; // Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
  preserveAspectRatio?: string; // viewBox属性,主要用于控制viewBox的位置，或者说viewbox的对齐方式 , ，x,y 分别各有3种值xMin、xMid、xMax、yMin、yMid、yMax
  className?: string;
}

export default forwardRef((props: IProps, ref: Ref<any>) => {
  const {
    renderer = 'svg',
    loop = true,
    autoPlay = true,
    animationData,
    path = '',
    imageAssetsFolder,
    rendererSettings,
    initLoad,
  } = props;

  const refContainer = useRef(null); // 动画渲染容器
  const refAnimation = useRef<AnimationItem | null>(null); // 对外输出的ref 对象
  useImperativeHandle(ref, () => ({
    init: () => refAnimation.current,
  })); // 指定父级组件调用暴露的 ref对象,方便控制动画
  let cacheAnimationOptions: any = useMemo(() => {
    const options: IProps = {
      loop,
      renderer,
      autoPlay,
      rendererSettings,
    };
    if (animationData) {
      options.animationData = animationData;
      if (imageAssetsFolder) setImageAssetsFolder(options.animationData.assets, imageAssetsFolder);
    } else {
      options.path = path;
    }
    return options;
  }, [loop, renderer, animationData, path]);

  useEffect(() => {
    if (!refContainer.current) return;
    // 渲染动画
    const lottieAnimationItem: AnimationItem = lottie.loadAnimation({
      container: refContainer.current,
      ...cacheAnimationOptions,
    });
    if (typeof initLoad === 'function') initLoad(lottieAnimationItem);

    // 渲染后的动画实例对象复制给 refAnimation.current，返回
    refAnimation.current = lottieAnimationItem;
    return () => {
      if (!refContainer.current) return;
      refAnimation.current = null; // 重置下
      cacheAnimationOptions = null;
      lottieAnimationItem.destroy(); // 避免内存泄漏
    };
  }, [refContainer.current, cacheAnimationOptions, initLoad]);
  const width = rendererSettings?.width ? rendererSettings?.width + 'px' : '100%';
  const height = rendererSettings?.height ? rendererSettings?.height + 'px' : '100%';

  return <div ref={refContainer} style={{ width: width, height: height }}></div>;
});
/**
 * 批量更新assets里的图片目录
 * @param assets assets object
 * @param imgUrl 图片目录|path
 */
const setImageAssetsFolder = (assets: Array<{ u: string; p: string }>, imgUrl: string) => {
  const t = new Date();
  assets.forEach((item) => {
    if (item.u === imgUrl || item.p.indexOf('?t=') !== -1) return;
    const img = new Image();
    item.u = imgUrl;
    item.p = item.p + `?t=${t.getTime()}`;
    img.src = imgUrl + item.p; // 预加载
  });
};
