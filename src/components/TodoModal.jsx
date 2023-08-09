/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import styles from "../styles/modules/modal.module.scss";
import { MdOutlineClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slice/todoSlice";
import { nanoid } from 'nanoid';
const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle('');
      setStatus('');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '' || status === '') {
      toast.error('Please fill in all fields');
    }
    if (status === '') {
      toast.error('Please select a status');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: nanoid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task added successfully');
      }
    }
    // Update todo
    if (type === 'update') {
      if (todo.title !== title || todo.status !== status) {
        dispatch(updateTodo({ ...todo, title, status }));
        toast.success('Task Updated successfully');
      } else {
        toast.error('No changes made');
        return;
      }
    }

    setModalOpen(false);
    // Reset state after successful form submission
    setTitle('');
    setStatus('');
  };




  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form}
              onSubmit={(e) => handleSubmit(e)}
            >

              <h1 className={styles.formTitle}>
                {type === "add" ? "Add" : "Update"} TODO
              </h1>

              <label htmlFor="title">
                Title
                <input type="text" id="title" value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label htmlFor="type" >
                Status
                <select id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option >Choose ...</option>
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>

              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "add" ? "Add Task" : "Update Task"}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>

            </form>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
