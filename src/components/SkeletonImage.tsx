import { useState } from "react";

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  skeletonClass?: string;
}

const SkeletonImage = ({ skeletonClass = "", className = "", onLoad, ...props }: SkeletonImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${skeletonClass}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-inherit" />
      )}
      <img
        {...props}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </div>
  );
};

export default SkeletonImage;
