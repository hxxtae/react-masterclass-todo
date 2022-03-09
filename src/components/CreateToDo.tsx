import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toDoCategory, toDoState } from '../atoms';

const CreateBox = styled.div`
  position: relative;

  input {
    padding: 10px;
    margin-left: 80px;
    border: 1px solid white;
    border-radius: 20px;
    box-shadow:  0px 5px 50px #bebebe, -0px -5px 50px #ffffff;
    transition: 200ms ease-in-out;

    &:active {
      transform: translate(2px, 2px);
    }
  }

  button {
    width: 100px;
    padding: 10px;
    border: 1px solid white;
    border-radius: 20px;
    margin-left: 40px;
    
    &:hover {
      color: #56EB22;
      text-shadow: 0 0 20px #56EB22;
      transition: 200ms ease-in-out;
    }

    &:active {
      transform: translate(2px, 2px);
    }
  }

  span {
    position: absolute;
    bottom: -20px;
    left: 100px;
    
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setTodos = useSetRecoilState(toDoState);
  const category = useRecoilValue(toDoCategory);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    setTodos((prevTodo) => {
      const newTodos = [...prevTodo, { text: toDo, id: Date.now(), category }];
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return newTodos;
    });
    setValue('toDo', '');
  }
  
  console.log('CreateToDo');
  
  return (
    <CreateBox>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('toDo', { required: "Please write text...", maxLength: { value: 20, message: "text length is 20" } })} placeholder="write your todo..." autoComplete='off' />
        <span>
          { errors.toDo?.message }
        </span>
        <button>Add</button>
      </form>
    </CreateBox>
  );
}

export default CreateToDo;