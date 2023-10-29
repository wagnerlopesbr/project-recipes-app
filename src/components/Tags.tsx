type Props = {
  tagList: string[]
  index: number;
};

function Tags({ tagList, index }: Props) {
  return (
    <div>
      {tagList.map((tag) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
      ))}
    </div>
  );
}

export default Tags;
