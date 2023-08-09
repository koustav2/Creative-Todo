/* eslint-disable no-unused-vars */


import { useState } from 'react'

import './App.css'
import PageTitle from './components/Title'
import styles from './styles/modules/app.module.scss';
import Header from './components/Header';
import AppContent from './components/AppContent';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <div className="container">
        <PageTitle>TODO List</PageTitle>
        <div className={styles.app__wrapper}>
          <Header />
          <AppContent/>
        </div>
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  )
}

export default App
