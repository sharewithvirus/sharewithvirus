import React from 'react'
import styles from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react/cjs/react.development';
import { Modal, Button } from 'react-bootstrap';
import { TestSetCard } from './TestSetCard';


const MCQ = () =>{
    const [arr, setArr] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30])
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(1)

    return (    
        
        <>
            {index === 1 && 
            <div>
                <div className="row ml-5">
                
                    <div className={styles.scoreGlobal}>
                        <div className={styles.mcqContainer}>
                            <h4>Test Set Name</h4>
                                <div className={styles.mcqselect}>
                                    <button type="button" class="btn btn-outline-dark">Past Test Taken</button>
                                    <button type="button" class="btn btn-outline-dark" onClick={()=>setIndex(4)}>Test Sets</button>
                                </div>
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.scoreGlobal}>
                        <div className={styles.mcqSetContainer}>

                        <div className={styles.scoreAll}>
                            {arr.map((i)=>{
                                return (
                                    <div className={styles.scoreEach} onClick={()=> setShow(true)}>
                                        <h6>{i}</h6>
                                        
                                    </div>
                                )
                            })}
                        </div>

                        <div className={styles.mcqModal}>
                            <Modal show={show} centered dialogClassName={styles.myModal}>
                              <div className={styles.mcqModalInner}>
                                <Modal.Header>
                                    <h5>Question</h5>
                                </Modal.Header>
                                <Modal.Body>
                                    <h6>What is the name of our country?</h6>
                                        <div className={styles.mcqSet}>
                                            <div className={styles.mcquestions}>
                                                <label for='ans1'>India</label>
                                                <label for='ans2'>USA</label>
                                                <label for='ans3'>France</label>
                                                <label for='ans4'>Nepal</label>
                                            </div>
                                            <div className={styles.mcqAnswers}>
                                                <input type="radio" id='ans1' name='ans' className={styles.answer}/>
                                                <input type="radio" id='ans2' name='ans' className={styles.answer}/>
                                                <input type="radio" id='ans3' name='ans' className={styles.answer}/>
                                                <input type="radio" id='ans4' name='ans' className={styles.answer}/>
                                            </div>
                                        </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={()=> setShow(false)}>Close</Button>
                                </Modal.Footer>
                              </div>
                            </Modal>
                        </div>


                            <div className={styles.mcqSetButtons}>
                                <button type="button" class="btn btn-outline-dark" onClick={()=> setIndex(2)}>Add New Question</button>
                                <button type="button" class="btn btn-outline-dark" onClick={()=> setIndex(3)}>Create Test Set</button>
                            </div>
                        </div>
                    </div>
                   
                    
                    
                </div>
            </div>
          } 

          {index ===2 && 
            <>
                <div className={styles.scoreGlobal}>
                    <div class={`form-group ${styles.createQuestionBack}`}>
                     <i class="fa fa-arrow-left" aria-hidden="true" onClick={()=>setIndex(1)}></i>
                     <h4>Create Questions</h4>
                     <div></div>
                    </div>
                </div>

                <div className={styles.createQuestionCard}>
                    <div className={styles.scoreGlobal}>
                            <div class={`form-group ${styles.questionInput}`}>
                                <label for="usr">Enter Question:</label>
                                <input type="text" class="form-control" id="usr"/>
                            </div>
                    </div>

                        <div className={styles.scoreGlobal}>
                            <div className={styles.mcqoptions}>
                                    <div class={`form-group ${styles.optionInput}`}>
                                        <label for="usr">Option 1</label>
                                        <input type="text" class="form-control" id="usr"/>

                                        <label for="usr">Option 3</label>
                                        <input type="text" class="form-control" id="usr"/>
                                    </div>
                                    <div class={`form-group ${styles.optionInput}`}>
                                        <label for="usr">Option 2</label>
                                        <input type="text" class="form-control" id="usr"/>

                                        <label for="usr">Option 4</label>
                                        <input type="text" class="form-control" id="usr"/>
                                    </div>
                            </div>
                        </div>

                        <div className={styles.scoreGlobal}>
                             <div className={styles.mcqcreate} onClick={()=>setIndex(1)}>
                                  <button type="button" class="btn btn-outline-secondary">Create Question</button>
                             </div>
                        </div>
                </div>


                
                
            </>
          }
          {index ===3 && 
            <>

                <div className={styles.scoreGlobal}>
                    <div class={`form-group ${styles.createQuestionBack}`}>
                     <i class="fa fa-arrow-left" aria-hidden="true" onClick={()=>setIndex(1)}></i>
                     <h4>Create Tests</h4>
                     <div></div>
                    </div>
                </div>

                <div className={styles.createQuestionCard}>

                        <div className={styles.scoreGlobal}>

                                <div class={`form-group ${styles.createTestInputs}`}>
                                    <div className={styles.createTestInputsItems}>
                                        <label for="usr">Test Name</label>
                                        <input type="text" class="form-control" placeholder='test Name' id="usr"/>
                                    </div>
                                    
                                    <div className={styles.createTestInputsItems}>
                                        <label for="usr">Total Questions</label>
                                        <input type="text" class="form-control" placeholder='Questions' id="usr"/>
                                    </div>
                                    <div className={styles.createTestInputsItems}>
                                        <label for="usr">Total Marks</label>
                                        <input type="text" placeholder='Marks' class="form-control" id="usr"/>
                                    </div>
                                </div>
                        </div>

                        <div className={styles.scoreGlobal}>
                             <div className={styles.mcqcreate} onClick={()=>setIndex(1)}>
                                  <button type="button" class="btn btn-outline-secondary">Create Test</button>
                             </div>
                        </div>
                </div>  
            </>
          }

          {index === 4 && 
            <> 
                <div className={styles.scoreGlobal}>
                    <div class={`form-group ${styles.createQuestionBack}`}>
                     <i class="fa fa-arrow-left" aria-hidden="true" onClick={()=>setIndex(1)}></i>
                     <h4>Test Sets</h4>
                     <div></div>
                    </div>
                </div>

                <div className={styles.scoreGlobal}>
                  <div className={styles.searchContainer}>
                    <table className={styles.searchTable}>
                        <tr>
                            <td>
                                <input class={styles.search} type="text" placeholder="Search..." />
                            </td>
                            <td>
                                <a ><i class="fa fa-search fa-sm" aria-hidden="true"></i></a>

                            </td>
                            </tr>
                    </table>
                  </div>
                </div>

                <div className={styles.scoreGlobal}>
                    <div className={styles.testSetCardContainer}>
                        <TestSetCard changeIndex={ind => setIndex(ind)}/>
                        <TestSetCard changeIndex={ind => setIndex(ind)}/>
                        <TestSetCard changeIndex={ind => setIndex(ind)}/>
                        <TestSetCard changeIndex={ind => setIndex(ind)}/>
                        <TestSetCard changeIndex={ind => setIndex(ind)}/>
                        <TestSetCard changeIndex={ind => setIndex(ind)}/>
                        <TestSetCard changeIndex={ind => setIndex(ind)}/>
                    </div>
                 </div>

                
            </>
          }

        </> 
         
     )
}

export default MCQ
