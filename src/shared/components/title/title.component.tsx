import "./title.component.scss";

interface TitleProps {
  children: string;
}

const Title = (props: TitleProps) => {
  return (
    <div className="title">
      <h1>{props.children}</h1>
    </div>
  );
};

export default Title;
