/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { getClasses } from '../utils/getClasses';
import styles from '../styles/modules/todoItem.module.scss';
import TodoModal from './TodoModal';
import CheckButton from './CheckBtn';
import { deleteTodo, updateTodo } from '../slice/todoSlice';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo, key }) {
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  //change the status of the todo
  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({ ...todo, status: checked ? 'incomplete' : 'complete' })
    );
    toast.success('Task updated successfully');
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Task deleted successfully');
  }

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  }



  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(todo.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
    </>
  )
}

export default TodoItem
