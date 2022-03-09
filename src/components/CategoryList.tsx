import { useRecoilState } from 'recoil';
import { Category, toDoCategory } from '../atoms';
import styled from 'styled-components';

const SelectBox = styled.div`
  border-radius: 20px;
  box-shadow:  0px 5px 50px #bebebe, -0px -5px 50px #ffffff;
  overflow: hidden;
  transition: 200ms ease-in-out;

  &:active {
    transform: translate(2px, 2px);
  }
`;

const SelectItem = styled.select`
  width: 200px;
  padding: 10px;
  border: 1px solid white;
  border-radius: 20px;
  cursor: pointer;
`;

function CategoryList() {
  const [category, setCategory] = useRecoilState<Category>(toDoCategory);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const categorySelect = +event.currentTarget.value as Category;
    setCategory(categorySelect);
  }

  console.log('Category');

  return (
    <SelectBox>
      <SelectItem value={category} onInput={onInput}>
        <option value={Category.TO_DO}>To do</option>
        <option value={Category.DOING}>Doing</option>
        <option value={Category.DONE}>Done</option>
      </SelectItem>
    </SelectBox>
  );

}

export default CategoryList;
