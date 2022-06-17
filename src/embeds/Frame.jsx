// import { OpenIcon } from "outline-icons";
import * as React from "react";
import { Iframe, Rounded, Open, Title, Bar } from "./styles";
class Frame extends React.Component {
  render() {
    const {
      border,
      width = "100%",
      height = "400px",
      forwardedRef,
      icon,
      title,
      canonicalUrl,
      isSelected,
      referrerPolicy,
      src,
    } = this.props;
    const withBar = !!(icon || canonicalUrl);
    console.log("frame loaded", this.isLoaded);
    return (
      <Rounded
        width={width}
        height={height}
        withBar={withBar}
        border={border}
        className={isSelected ? "ProseMirror-selectednode" : ""}
      >
        <Iframe
          ref={forwardedRef}
          withBar={withBar}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
          width={width}
          height={height}
          frameBorder="0"
          title="embed"
          loading="lazy"
          src={src}
          referrerPolicy={referrerPolicy}
          allowFullScreen
        />
        {withBar && (
          <Bar>
            {icon} <Title>{title}</Title>
            {canonicalUrl && (
              <Open
                href={canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <OpenIcon color="currentColor" size={18} /> Open */}
              </Open>
            )}
          </Bar>
        )}
      </Rounded>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Frame {...props} forwardedRef={ref} />
));
