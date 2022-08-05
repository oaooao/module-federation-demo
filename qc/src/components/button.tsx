export const Button = (props: any) => {
  const content = props.children || "来自 QC 的 Button";

  return <button>{content}</button>;
};
