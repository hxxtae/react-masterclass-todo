import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { toDoCategory, toDoSelector, Category } from '../atoms';
import CategoryList from './CategoryList';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const Box = styled.div``;

const CreateBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TodoSection = styled.section`
  margin-top: 50px;

  strong {
    font-size: 30px;
    letter-spacing: 5px;
  }

  ul {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    flex-shrink: 1;
    margin-top: 50px;
  }

`;

function ToDoList() {
  const todos = useRecoilValue(toDoSelector);
  const category = useRecoilValue<Category>(toDoCategory);

  const title = () => {
    const name = category;
    return name === 0 ? 'Todo' : name === 1 ? 'Doing' : name === 2 ? 'Done' : '';
  }

  console.log('ToDoList');

  return (
    <Box>
      <CreateBox>
        <CategoryList />
        <CreateToDo />  
      </CreateBox>
      <TodoSection>
        <strong>{title()}</strong>
        <ul>
          {
            todos.map((todo) =>
              (<ToDo key={todo.id} {...todo}/>)
            )
          }
        </ul>
      </TodoSection>
    </Box>
  );
}

export default ToDoList;

// [ currentTarget ]
// event.currentTarget은 이벤트 핸들러를 명시적으로 연결하는 요소입니다.


/* [ 일반적인 input-form 작성법 (with: typescript) ]
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value }
    } = event;
    setToDo(value);
  }
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(toDo);
  
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="write your name..." required />
        <button>Add</button>
      </form>
    </div>
  );
}
*/

/* [ useFrom을 사용한 작성법 ]
interface IFormInput {
  name1: string;
  name2: string;
  pasword: string;
  extraError?: string;
}
// register('name1'), register('name2'), ...

function ToDoList() {
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<IFormInput>({
    defaultValues: {
      name2: 'iam',
    }
  });
  console.log(errors);
  const onValid = (data: IFormInput) => {
    console.log(data);
    
    // setError()
    if (data.name1 !== data.name2) {
      return setError('name1', { message: 'Not Same name1 & name2',  }, { shouldFocus: true }); // name, errorOption, 
    }
    return setError('extraError', { message: 'Server offline' });

  };
  

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register('name1', { required: "name1 null", maxLength: { value: 5, message: 'manyLong...' } })} placeholder="write your name..." />
        <input {...register('name2', {
          required: 'name2 null',
          pattern: {
            value: /[^a-z]/g,
            message: 'Only email of naver'
          },
          validate: {
            makeFunc: (value) => (value.includes('123') ? "no 123" : true), // - 사용자 지정 validate 함수를 지정할 수 있다.
            makeFunc2: (value) => (value.includes('321') ? "no 321" : true) // - return 이 true면 통과, false면 미통과
            // 함수 앞에 async 를 붙여 비동기로 만들어서 서버에다가 확인하고 응답을 받을 수도 있다.
          }
        })} /> 
        <p>{`name1 Error: ${errors?.name1?.message || ''}`}</p>
        <p>{`name2 Error: ${errors?.name2?.message || ''}`}</p>
        <button>Add</button>
        <span>{`Form Error: ${errors?.extraError?.message || ''}`}</span>
      </form>
    </div>
  );
}

*/

/*[ react hook form ]
- useForm()
How to use it?
- const { register, handleSubmit, watch, formState: { error }, setError, setValue } = useForm();
  1. register : { required, min, max, minLength, maxLength, pattern, validate }
      -> input, select 등 입력 폼에 제공하는 속성 옵션들

      ※ react-hook-form 에서 문자열을 리턴하면, 그건 즉 에러 메세지를 리턴한다는 뜻이다.
          ex) required = "에러 메세지", validate: (value) => "에러 메세지"

      ※ validate
          - 사용자 지정 validate 함수를 지정할 수 있다.
          - return 이 true면 통과, false면 미통과
          - 함수 앞에 async 를 붙여 비동기로 만들어서 서버에다가 확인하고 응답을 받을 수도 있다.

  2. handleSubmit
      -> form 의 onSubmit 이벤트에 할당되는 함수 선언문으로, 원하는 동작을 수행하는 함수를 인자로 전달할 수 있다.
          첫번째 인자(필수): 데이터가 유효할 때 호출되는 함수
          두번째 인자(비필수): 데이터가 유효하지 않을 때 호출되는 함수

          - 즉 첫번째 함수가 호출되었다면, form이 모든 validation을 통과했고,
            모든 input의 입력값들이 다 정상적이고 에러가 없다는 것이다.

  3. watch
      -> console.log(watch())를 실행하면 form 안의 입력 폼이 change 될 때 마다
          handleSubmit의 반환 객체가 출력되는걸 확인 할 수 있다.

  4. formState
      formState.errors -> 입력폼에 지정된 잘못된 값 입력 시 error message 객체를 반환한다.
      그리고 HTML 태그에 에러 메세지를 출력할 수 있도록 에러 메세지 값을 가져올 수 있다.
  
  5. setError
      -> setError는 특정한 에러를 발생 시키고 싶을 때 사용한다. 
          즉 조건을 따른 추가적인 에러를 설정할 수 있게 해준다.
          
      ※ setError 가 있는 이유
          input, select 에서 사용자가 발생시키는 에러 말고
          코드적으로, 다른 조건에 따른 에러처리를 원하는 경우처럼
          유연한 에러처리가 가능하도록 하기위해서 이다.

  6. setValue
      -> 해당 입력폼을 지정한 다음, 지정된 폼의 값을 재할당 해준다.
          ex) setValue('name1', '')
          호출 시 name1 입력란을 '' 로 변경해줌
*/


// [ recoil - useRecoilState ]
// useState() 의 반환값 처럼
// state의 값과 변경하는 함수를 반환해 주는 Hook

