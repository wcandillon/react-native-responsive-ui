import React from "react";
import { PixelRatio, Platform, ScaledSize } from "react-native";
import useDimensions from "./useDimensions";

type Orientation = "landscape" | "portrait";

export interface IMediaQuery {
  minHeight?: number;
  maxHeight?: number;
  minWidth?: number;
  maxWidth?: number;
  minAspectRatio?: number;
  maxAspectRatio?: number;
  minPixelRatio?: number;
  maxPixelRatio?: number;
  orientation?: Orientation;
  condition?: boolean;
  platform?: string;
}

export const isInInterval = (
  value: number,
  min?: number,
  max?: number
): boolean =>
  (min === undefined || value >= min) && (max === undefined || value <= max);

export const mediaQuery = (
  {
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    minAspectRatio,
    maxAspectRatio,
    orientation,
    platform,
    minPixelRatio,
    maxPixelRatio,
    condition
  }: IMediaQuery,
  dimensions: ScaledSize
): boolean => {
  const { width, height } = dimensions;
  const currentOrientation: Orientation =
    width > height ? "landscape" : "portrait";
  return (
    isInInterval(width, minWidth, maxWidth) &&
    isInInterval(height, minHeight, maxHeight) &&
    isInInterval(width / height, minAspectRatio, maxAspectRatio) &&
    isInInterval(PixelRatio.get(), minPixelRatio, maxPixelRatio) &&
    (orientation === undefined || orientation === currentOrientation) &&
    (platform === undefined || platform === Platform.OS) &&
    (condition === undefined || condition)
  );
};

interface MediaQueryProps extends IMediaQuery {
  children?: React.ReactNode;
}

export default ({ children, ...props }: MediaQueryProps) => {
  const dimensions = useDimensions();
  const val = mediaQuery(props, dimensions);
  if (val) {
    return children;
  }
  return null;
};
