import { Children, isValidElement } from "react";

export function getReactNodeText(children) {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (isValidElement(child)) {
        return getReactNodeText(child.props.children);
      }

      return "";
    })
    .join("");
}
