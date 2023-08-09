/* eslint-disable no-unused-vars */
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from '../styles/modules/app.module.scss';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const container = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};
const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
    },
};

function AppContent() {
    const todoList = useSelector((state) => state.todos.todoList);
    const filterStatus = useSelector((state) => state.todos.filterStatus);

    const filteredAndSortedTodoList = [...todoList].filter((item) => {
        if (filterStatus === 'all') {
            return true;
        }
        return item.status === filterStatus;
    }).sort((a, b) => new Date(b.time) - new Date(a.time));

    return (
        <motion.div
            className={styles.content__wrapper}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <AnimatePresence>
                {filteredAndSortedTodoList.length > 0 ? (
                    filteredAndSortedTodoList.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                ) : (
                    <motion.p variants={child} className={styles.emptyText}>
                        No Todos found
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default AppContent;
