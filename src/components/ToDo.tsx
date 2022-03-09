import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { GrClose } from "react-icons/gr";
import { Category, ITodo, toDoState } from '../atoms';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CategoryButton = styled.button`
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  background-color: transparent;

  &:hover {
    opacity: 0.4;
  }
`;

const DeleteBtn = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: transparent;
  border: none;
  
  &:hover,
  &:active {
    opacity: 0.4;
  }
`;

const TodoItem = styled.li`
  width: 25%;
  height: 120px;
  border: 1px solid rgba(255, 255, 255, .4);
  border-radius: 15px;
  margin-bottom: 15px;
  padding: 15px;

  P {
    margin-top: 15px;
  }
`;

function ToDo({ text, category, id }: ITodo) {
  const setTodos = useSetRecoilState(toDoState);

  const onClick = (event:React.FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name }
    } = event;

    setTodos(prevTodo => {
      const targetIndex = prevTodo.findIndex(todo => todo.id === id);
      const oldTodo = prevTodo[targetIndex];
      const newTodo = { text, id, category: +name as Category };

      const resultFront = [...prevTodo].splice(0, targetIndex);
      const resultBack = [...prevTodo].splice(targetIndex + 1);
      
      const updateTodos = [...resultFront, newTodo, ...resultBack];
      localStorage.setItem('todos', JSON.stringify(updateTodos));
      return updateTodos;
      
      // immutability (불변성) 법칙
    });
  }

  const deleteClick = () => {
    setTodos(prevTodo => {
      const deletTodos = prevTodo.filter((todo) => todo.id !== id);
      localStorage.setItem('todos', JSON.stringify(deletTodos));
      return deletTodos;
    });
  }

  console.log('ToDo');

  return (
    <TodoItem>
      <ButtonWrapper>
        <div>
          {
            category !== Category.DOING && (
              <CategoryButton 
                type="button" 
                name={Category.DOING + ""}
                onClick={onClick}>Doing
              </CategoryButton>
            )
          }
          {
            category !== Category.TO_DO && (
              <CategoryButton 
                type="button" 
                name={Category.TO_DO + ""}
                onClick={onClick}>To Do
              </CategoryButton>
            )
          }
          {
            category !== Category.DONE && (
              <CategoryButton 
                type="button" 
                name={Category.DONE + ""} 
                onClick={onClick}>Done
              </CategoryButton>
            )
          }
        </div>
        {
          <DeleteBtn type="button" onClick={deleteClick}>
            <IconContext.Provider value={{ color: "white" , size: "14px"}}>
              <GrClose color="white" />
            </IconContext.Provider>
          </DeleteBtn>
        }
      </ButtonWrapper>
      <p>{text}</p>
    </TodoItem>
  );
}

export default ToDo;

// [ 함수할당 시 인자도 같이 넘겨주는 트릭 ] ★★★
// 함수를 할당할 때 인자도 같이 넘겨주고 싶다면
// callback 함수로 함수를 감싸서 할당해 준다.
// ex) onClick={clickFunc}
//     -> onClick={() => clickFunc(val)}

// [ findIndex() ]
// findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): number;

// [ 상태관리 시 상태관리 변수를 직접 수정하면 안된다. ]
// 상태관리툴을 사용할때는 기본적으로 mutate를 사용하지 않고 상태를 변경해줘야 합니다.
// 그냥 const newTodos = prevTodos 이렇게 하시면
// prevTodos를 가리키는 주소를 newTodos에 할당하기 때문에 newTodos를 변경하면 prevTodos도 같이 변경되어 mutate 되게됩니다.
// 그래서 완전히 새로운 object나 array를 만들어주고
// 거기에 요소들을 그대로 입력해주기위해 spread 방식을 사용한것입니다.
// 다른 방식으로는 Object.assign() 등을 사용해 할당 할 수도 있습니다.

// ※ splice()는 배열이 복사되지 않고 직접 수정되기 때문에 map과 다르게 상태관리 객체를 건들어 에러가 난다.

// ※ Mutate는 let a = 1; 에서 a = 2 와 같이 a를 직접적으로 변경시키는걸 말합니다.
//    위에서는 참조값(객체) 이므로 새로운 객체를 생성해서 반환해 주어야 한다.


// [ recoil - selector ]
// 공식문서 : Selector는 derived state (파생 state)를 나타냅니다.
// drived state란,
// 1. state를 입력 받아서
// 2. 그걸 변형해 반환하는 순수합수를 거쳐
// 3. 반환된 값을 말합니다.

//   (정의)
// - selector 는 atom의 output을 변형시키는 도구이다.
//   더 깊게 말하자면
//   state 자체를 변형시키는게 아니라, state의 output을 변형하는 것뿐이고 그게 selector의 요점이다.
// - selector 는 state를 가져다가 뭔가를 return 할 것이다.
// - useRecoilValue()로 atom의 output도, selector의 output도 얻을 수 있다.

//   (사용)
// - state를 출력(render)할 때 2가지 방법
//   1. state의 output 을 가져다 쓴다면, useRecoilValue()에 atom의 변수 할당
//   2. state의 output 을 가공하여 가져다 쓴다면, useRecoilValue()에 selector의 변수 할당

// - ★★★ selector는 새로운 state를 만들어 반환하는게 아니라
//          state의 output만 변형시키는 것이다.
