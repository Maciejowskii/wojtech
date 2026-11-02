import parse from "html-react-parser";

type Props = {
  html: string;
  className?: string;
};

/** Renderuje wcześniej zsanityzowany HTML bez dangerouslySetInnerHTML. */
export function SafeHtml({ html, className }: Props) {
  return <div className={className}>{parse(html)}</div>;
}
