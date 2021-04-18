import React, {useState} from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { setItems } from '../store/main-actions';  
// Style
import styled from 'styled-components';
import { Button, Input } from './style/main-styled-form';
import { ListItems, ItemCheck, ItemTodo } from './style/list-items-styled';

export const Wrapper = styled.div`
  padding-top: 40px;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
`;

export const Main:React.FC = () => {
  // React hooks
  const [valueInput, setValueInput] = useState<string>('');
  
  // Redux hooks
  const dispatch = useDispatch();
  const items = useSelector((state:RootStateOrAny) => state.root.items);

  // inputControll
  const changeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  }

  // Save to redux 
  const saveList = (e:React.FormEvent<HTMLFormElement>) => {
    if(!valueInput){
      e.preventDefault();
      alert("No.....")
    }else{
      e.preventDefault();
      dispatch(setItems([...items, {id:items.length, text:valueInput, check:false}]));
      setValueInput('');
    }
  }
  
  // delete items
  const deleteItems = (id:number) => {
    const newItems = items.filter((el:any) => {
      return el.id !== id;
    })
    dispatch(setItems(newItems));
  }
  // check item
  const checkItem = (id:number) => {
    const newItems = items.filter((el:any) => {
        if(el.id === id){
            el.check = !el.check;
        }
        return el;
    })
    dispatch(setItems(newItems))
  }
  return (
    <Wrapper>
        <form onSubmit={saveList} >
          <Input value={valueInput} onChange={changeInput} placeholder="Your to do"/>
          <Button type="submit">Submit</Button>
        </form>
      <ListItems>
      <div>
          <h2>Check items...</h2>
          <ul>
          {items.map((el:any, index:number) =>{
            if(el.check){
                return (
                    <ItemCheck key={index}>
                        <li key={index} onClick={() => checkItem(el.id)} >
                            {el.text}
                        </li>
                        <span onClick={() => deleteItems(el.id)} >X</span>
                    </ItemCheck>
                )
            }})}
          </ul>
        </div>
        <div>
          <h2>Items...</h2>
        <ul>
        {items.map((el:any, index:number) =>{
            if(!el.check){
                return (
                    <ItemTodo key={index}>
                        <li key={index} onClick={() => checkItem(el.id)} >
                            {el.text}
                        </li>
                        <span onClick={() => deleteItems(el.id)} >X</span>
                    </ItemTodo>
                )
            }})}
        </ul>
        </div>
      </ListItems>
    </Wrapper>
  );
}