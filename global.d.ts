declare module '@lottiefiles/dotlottie-wc';

declare namespace React.JSX {
  interface IntrinsicElements {
    'dotlottie-wc': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      src?: string;
      autoplay?: boolean;
      loop?: boolean;
      style?: React.CSSProperties;
    };
  }
}
