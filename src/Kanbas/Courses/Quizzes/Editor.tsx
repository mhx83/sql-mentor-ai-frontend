import { SlCalender } from "react-icons/sl";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { deleteQuiz, updateQuiz, switchCreationStatus } from "./reducer";
import * as quizzesClient from "./client";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {setQuestions} from "./Questions/reducer";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function QuizEditor() {

    const quizTypes = ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"];
    const groupItems = ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"];
    const difficulties = ["Easy", "Medium", "Hard"];

    const location = useLocation();
    const currentPath = location.pathname;

    const { cid, qid } = useParams();
    const { quizzes, new_quiz_created } = useSelector((state: any) => state.quizzesReducer);
    const quiz = quizzes.find((quiz: any) => quiz._id === Number(qid));
    const { questions } = useSelector((state: any) => state.questionsReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    // const { questions, answers } = useSelector((state: any) => state.questionsReducer);

    const [name, setName] = useState(quiz && quiz.name);
    const [instruction, setInstruction] = useState(quiz && quiz.instruction);
    const [type, setType] = useState(quiz?.quiz_type || "Graded Quiz");
    const [points, setPoints] = useState(quiz && quiz.points);
    const [numOfQuestions, setNumOfQuestions] = useState(quiz && quiz.num_of_questions);
    const [group, setGroup] = useState(quiz?.assignment_group || "QUIZZES");
    const [difficulty, setDifficulty] = useState(quiz?.difficulty || "Easy");
    const [shuffleStatus, setShuffle] = useState(quiz && quiz.shuffle_answer);
    const [hasTimeLimit, setHasTimeLimit] = useState(quiz && quiz.has_time_limit);
    const [timeLimit, setTimeLimit] = useState(quiz && quiz.time_limit);
    const [hasManyAttempts, setHasManyAttempts] = useState(quiz && quiz.has_many_attempts);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(quiz && quiz.show_correct_answer);
    const [showAnswerDate, setShowAnswerDate] = useState(quiz && quiz.show_answers_date);
    const [numOfAttempts, setNumOfAttempts] = useState(quiz && quiz.how_many_attempts);
    const [accessCodeRequired, setCodeReq] = useState(quiz && quiz.access_code_required);
    const [accessCode, setAccessCode] = useState(quiz && quiz.access_node);
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(quiz && quiz.one_question_at_a_time);
    const [webcamRequired, setWebcamReq] = useState(quiz && quiz.webcam_required);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(quiz && quiz.lock_questions_after_answering);
    const [due, setDue] = useState(quiz && quiz.due_date);
    const [availableFrom, setAvailableFrom] = useState(quiz && quiz.available_date);
    const [until, setUntil] = useState(quiz && quiz.until_date);

    const fetchQuestions = async () => {
        if (!qid) return;
        const fetchedQuestions = await quizzesClient.getQuestions(qid);
        dispatch(setQuestions(fetchedQuestions));
    }; useEffect(() => {
        fetchQuestions();
    }, [qid]);

    const cancelByStatus = async () => {
        if (!qid) return;

        if (new_quiz_created === true) {
            await quizzesClient.deleteQuiz(qid);
            dispatch(deleteQuiz(qid));
            dispatch(switchCreationStatus());
        }
    }

    const saveByStatus = async () => {

        if (new_quiz_created === true) {
            setPoints(0);
            setNumOfQuestions(0);
        }

        const currentQuiz = {
            _id: qid,
            name: name,
            instruction: instruction,
            course: cid,
            difficulty: difficulty,
            assignment_group: group,
            quiz_type: type
        };

        if (new_quiz_created === true) {
            dispatch(switchCreationStatus());
        }
        await quizzesClient.updateQuiz(currentQuiz);
        dispatch(updateQuiz(currentQuiz));
    }

    const formatDate = (date: any) => {
        date = new Date(date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const viewLastAttempt = async () => {
        if (!qid) {
            alert("Please complete at least one question before submitting.");
            return;
        }

        try {
            const data = await quizzesClient.lastAttempt(qid);
            console.log("data:", data);
            if (!data || data.message) {
                alert("No previous attempts found.");
                return;
            }
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Result`, { state: data });
        } catch (error) {
            console.error("Error fetching last attempt:", error);
            alert("Failed to fetch last attempt.");
        }
    };

    const handleAttempt = async () => {
        try {
            const response = await fetch(`${REMOTE_SERVER}/api/quizzes/${qid}/attempt/check`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            if (data.canAttempt) {
                if (!qid) return;
                dispatch(setQuestions(questions));
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/View/${questions[0]._id}`);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Attempts checking error:", error);
            alert("Unexpected error, please try again later。");
        }
    };


    useEffect(() => {
        if (quiz) {
            setShowCorrectAnswer(quiz.show_correct_answer === "yes" ? "yes" : "no");
        }
    }, [quiz]);


    return (
        <div className="wd-quizzes-editor">

            {currentUser.role === "FACULTY" &&
                <>
                    <div id="wd-css-navigating-with-tabs" className="ms-5 mt-2">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <Link to={`${currentPath}`} className="nav-link active"> Details </Link>
                            </li>
                            {questions.length > 0 ?
                                <Link to={`${currentPath}/Questions/${questions[0]._id}`} className="nav-link text-danger"
                                    onClick={saveByStatus}> Questions </Link>
                                : <Link to={`${currentPath}/Questions`} className="nav-link text-danger" onClick={saveByStatus}>
                                    Questions </Link>}
                        </ul>
                    </div>
                    <br />
                </>
            }

            <form>
                <div className="form-group row ms-5 mb-4">
                    {currentUser.role === "FACULTY" ?
                      <>
                          <label htmlFor="wd-name" className="col-form-label">Quiz Name</label>
                          <input id="wd-name" className="form-control ms-2 mt-3 w-75"
                                 value={name} onChange={(e) => setName(e.target.value)}/>
                      </> :
                      <div>
                          <label htmlFor="wd-name" className="col-form-label"><strong>Quiz Name</strong></label>
                          <p>{name}</p>
                          <hr/>
                      </div>
                    }
                </div>

                <div className="form-group row ms-5 mb-4">
                    {currentUser.role === "FACULTY" ?
                      <>
                          <label htmlFor="wd-description" className="col-form-label">
                              <strong>Description</strong>
                          </label>
                          <div>
                              <ReactQuill
                                value={instruction}
                                onChange={(value) => setInstruction(value)}
                                id="wd-description"
                                className="form-control ms-2 w-75"
                              />
                          </div>
                      </> :
                      <div>
                          <label htmlFor="wd-name" className="col-form-label"><strong>Description</strong></label>
                          <div dangerouslySetInnerHTML={{__html: instruction}}></div>
                          <hr/>
                      </div>
                    }
                </div>

                <div className="form-group row ms-5 mb-4">
                    {currentUser.role === "STUDENT" &&
                      <div>
                          <label htmlFor="wd-name" className="col-form-label"><strong>Points</strong></label>
                          <p>{points}</p>
                          <hr/>
                      </div>
                    }
                </div>

                <div className="form-group row ms-5 mb-4">
                    {currentUser.role === "FACULTY" ?
                      <>
                          <label htmlFor="wd-quiz-type" className="col-sm-2 col-form-label">Quiz Type</label>
                          <div className="col-sm-10">
                              <select id="wd-quiz-type" className="form-select w-25"
                                      onChange={(e) => setType(e.target.value)}>
                                  {quizTypes.map((quizType) => (quiz && quizType === quiz.quiz_type ?
                                    <option selected value={quizType}>{quizType}</option> :
                                    <option value={quizType}>{quizType}</option>))}
                              </select>
                          </div>
                      </> :
                      <div>
                          <label htmlFor="wd-quiz-type" className="col-form-label"><strong>Quiz Type</strong></label>
                          <p>{type}</p>
                          <hr/>
                      </div>
                    }
                </div>

                <div className="form-group row ms-5 mb-4">
                    {currentUser.role === "FACULTY" ?
                      <>
                          <label htmlFor="wd-group" className="col-sm-2 col-form-label">Assignment Group</label>
                          <div className="col-sm-10">
                              <select id="wd-group" className="form-select w-25"
                                      onChange={(e) => setGroup(e.target.value)}>
                                  {groupItems.map((groupItem) => (quiz && groupItem === quiz.assignment_group ?
                                    <option selected value={groupItem}>{groupItem}</option> :
                                    <option value={groupItem}>{groupItem}</option>))}
                              </select>
                          </div>
                      </> :
                      <div>
                          <label htmlFor="wd-quiz-type" className="col-form-label"><strong>Quiz Group</strong></label>
                          <p>{group}</p>
                          <hr/>
                      </div>
                    }
                </div>

                <div className="form-group row ms-5 mb-4">
                    {currentUser.role === "FACULTY" ?
                      <>
                          <label htmlFor="wd-group" className="col-sm-2 col-form-label">Difficulty</label>
                          <div className="col-sm-10">
                              <select id="wd-group" className="form-select w-25"
                                      onChange={(e) => setDifficulty(e.target.value)}>
                                  {difficulties.map((difficulty) => (quiz && difficulty === quiz.difficulty ?
                                    <option selected value={difficulty}>{difficulty}</option> :
                                    <option value={difficulty}>{difficulty}</option>))}
                              </select>
                          </div>
                      </> :
                      <div>
                          <label htmlFor="wd-quiz-type" className="col-form-label"><strong>Difficulty</strong></label>
                          <p>{difficulty}</p>
                          <hr/>
                      </div>
                    }
                </div>



                {/*<div className="form-group row ms-5 mb-4">*/}
                {/*    {currentUser.role === "FACULTY" ?*/}
                {/*        <>*/}
                {/*            <label htmlFor="wd-submission-type" className="col-sm-2 col-form-label"></label>*/}
                {/*            <div className="col-sm-10 form-control ms-2 p-3 w-25">*/}

                {/*                <div className="form-group ms-2">*/}
                {/*                    <label htmlFor="wd-entry-options" className="col-form-label"><strong>Quiz Options</strong></label>*/}

                {/*                    <div className="pt-2 mb-3 mt-2 form-check">*/}
                {/*                        <input className="form-check-input me-2" name="check-genre" type="checkbox" id="wd-shuffle-answer"*/}
                {/*                            checked={shuffleStatus === "yes"} onChange={(e) => setShuffle(e.target.checked ? "yes" : "no")} />*/}
                {/*                        <label className="form-check-label pt-1" htmlFor="wd-shuffle-answer">Shuffle Answer</label>*/}
                {/*                    </div>*/}

                {/*                    <div className="pt-2 mb-3 form-check">*/}
                {/*                        <div className="d-flex align-items-center">*/}
                {/*                            <input className="form-check-input me-2" name="check-genre" type="checkbox" id="wd-has-time-limit"*/}
                {/*                                checked={hasTimeLimit === "yes"}*/}
                {/*                                onChange={(e) => {*/}
                {/*                                    setHasTimeLimit(e.target.checked ? "yes" : "no");*/}
                {/*                                    if (!e.target.checked) {*/}
                {/*                                        setTimeLimit(99999);*/}
                {/*                                    }*/}
                {/*                                }} />*/}
                {/*                            <label className="form-check-label pt-1 me-4" htmlFor="wd-has-time-limit">Time Limit</label>*/}
                {/*                            {hasTimeLimit === "yes" && <><input type="input" id="wd-time-limit" className="form-control w-25 col-form-label"*/}
                {/*                                value={hasTimeLimit === "yes" ? timeLimit : 99999}*/}
                {/*                                disabled={hasTimeLimit === "no"}*/}
                {/*                                onChange={(e) => setTimeLimit(e.target.value)} />*/}
                {/*                                <span className="ms-2">Minute(s)</span></>}*/}
                {/*                        </div>*/}
                {/*                    </div>*/}

                {/*                    <div className="pt-2 mb-3 mt-2 form-check">*/}
                {/*                        <div className="d-flex align-items-center">*/}
                {/*                            <input className="form-check-input me-2" name="check-genre" type="checkbox" id="wd-allow-many-attempts"*/}
                {/*                                checked={hasManyAttempts === "yes"} onChange={(e) => {*/}
                {/*                                    setHasManyAttempts(e.target.checked ? "yes" : "no")*/}
                {/*                                    if (!e.target.checked) {*/}
                {/*                                        setNumOfAttempts(1);*/}
                {/*                                    }*/}
                {/*                                }} />*/}
                {/*                            <label className="form-check-label pt-1 me-2" htmlFor="wd-media-recordings">Allow Multiple Attempts</label>*/}
                {/*                            {hasManyAttempts === "yes" && <><input type="input" id="wd-num-of-attempts" className="form-control w-25 col-form-label ms-2"*/}
                {/*                                value={numOfAttempts}*/}
                {/*                                onChange={(e) => setNumOfAttempts(e.target.value)}*/}
                {/*                                disabled={hasManyAttempts === "no"} />*/}
                {/*                                <span className="ms-2">Attempt(s)</span></>}*/}
                {/*                        </div>*/}
                {/*                    </div>*/}

                {/*                    <div className="pt-2 mb-3 mt-2 form-check">*/}
                {/*                        <div className="d-flex align-items-center">*/}
                {/*                            <input className="form-check-input me-2" name="check-genre" type="checkbox" id="wd-show-answer"*/}
                {/*                                checked={showCorrectAnswer === "yes"} onChange={(e) => {*/}
                {/*                                    setShowCorrectAnswer(e.target.checked ? "yes" : "no");*/}
                {/*                                }} />*/}
                {/*                            <label className="form-check-label pt-1" htmlFor="wd-show-answer">Show Correct Answers</label>*/}
                {/*                            {showCorrectAnswer === "yes" && <><input type="datetime-local" id="wd-show-answer-date"*/}
                {/*                                className="form-control w-50 col-form-label ms-2"/></>}*/}
                {/*                        </div>*/}
                {/*                    </div>*/}

                {/*                    <div className="pt-2 mb-3 mt-2 form-check">*/}
                {/*                        <div className="d-flex align-items-center">*/}
                {/*                            <input className="form-check-input me-2" name="check-genre" type="checkbox" id="wd-access-code-req"*/}
                {/*                                checked={accessCodeRequired === "yes"} onChange={(e) => {*/}
                {/*                                    setCodeReq(e.target.checked ? "yes" : "no");*/}
                {/*                                    if (!e.target.checked) {*/}
                {/*                                        setAccessCode("blank");*/}
                {/*                                    }*/}
                {/*                                }} />*/}
                {/*                            <label className="form-check-label pt-1 me-2" htmlFor="wd-access-code-req">Access Code</label>*/}
                {/*                            {accessCodeRequired === "yes" && (<input type="input" id="wd-access-code"*/}
                {/*                                className="form-control w-50 col-form-label ms-2"*/}
                {/*                                value={quiz.access_code}*/}
                {/*                                onChange={(e) => setAccessCode(e.target.value)} />)}*/}
                {/*                        </div>*/}
                {/*                    </div>*/}

                {/*                    <div className="pt-2 mb-3 mt-2 form-check">*/}
                {/*                        <input className="form-check-input me-2" name="check-genre" type="checkbox" id="wd-one-at-time"*/}
                {/*                            checked={oneQuestionAtATime === "yes"} onChange={(e) => setOneQuestionAtATime(e.target.checked ? "yes" : "no")} />*/}
                {/*                        <label className="form-check-label pt-1" htmlFor="wd-one-at-time">One Question at a Time</label>*/}
                {/*                    </div>*/}

                {/*                    <div className="pt-2 mb-3 mt-2 form-check">*/}
                {/*                        <input className="form-check-input me-2" name="check-genre" type="checkbox" id="wd-webcam-req"*/}
                {/*                            checked={webcamRequired === "yes"} onChange={(e) => setWebcamReq(e.target.checked ? "yes" : "no")} />*/}
                {/*                        <label className="form-check-label pt-1" htmlFor="wd-webcam-req">Webcam Required</label>*/}
                {/*                    </div>*/}

                {/*                    <div className="pt-2 mb-3 mt-2 form-check">*/}
                {/*                        <input className="form-check-input me-2" name="check-genre" type="checkbox" id="wd-lock-questions"*/}
                {/*                            checked={lockQuestionsAfterAnswering === "yes"}*/}
                {/*                            onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked ? "yes" : "no")} />*/}
                {/*                        <label className="form-check-label pt-1" htmlFor="wd-lock-questions">Lock Questions After Answering</label>*/}
                {/*                    </div>*/}

                {/*                </div>*/}
                {/*            </div></> :*/}
                {/*        <div>*/}
                {/*            <label htmlFor="wd-entry-options" className="col-form-label"><strong>Quiz Options</strong></label><br />*/}
                {/*            {quiz.has_time_limit === "yes" ?*/}
                {/*                <><label htmlFor="wd-quiz-type" className="col-form-label"><strong>*/}
                {/*                    Time Limit: </strong>{quiz.time_limit} Minutes</label><br /></>*/}
                {/*                : <><><label htmlFor="wd-quiz-type" className="col-form-label"><strong>*/}
                {/*                    Time Limit: </strong>No</label><br /></></>}*/}
                {/*            <label htmlFor="wd-quiz-type" className="col-form-label"><strong>*/}
                {/*                Multiple Attempts: </strong>{quiz.has_many_attempts === "yes" ? quiz.how_many_attempts : "No"}</label><br />*/}
                {/*            <label htmlFor="wd-quiz-type" className="col-form-label"><strong>*/}
                {/*                Lock Questions After Answering: </strong>{quiz.lock_questions_after_answering === "yes" ? "Yes" : "No"}</label><hr />*/}
                {/*        </div>*/}
                {/*    }*/}
                {/*</div>*/}

                {/*<div className="form-group row ms-5 mb-4">*/}
                {/*    {currentUser.role === "FACULTY" ?*/}
                {/*        <>*/}
                {/*            <label className="col-sm-2 col-form-label">Assign</label>*/}
                {/*            <div className="col-sm-10 form-control ms-2 p-3 w-25">*/}

                {/*                <div className="form-group ms-1">*/}
                {/*                    <label htmlFor="wd-assign-to" className="col-form-label"><strong>Assign to</strong></label>*/}
                {/*                    <input type="input" id="wd-assign-to" className="form-control mt-1" value="Everyone" />*/}

                {/*                    <label htmlFor="wd-due-date" className="col-form-label mt-3"><strong>Due</strong></label>*/}
                {/*                    <div className="input-group mt-1">*/}
                {/*                        <input type="datetime-local" id="wd-due-date" className="form-control" value={formatDate(due)}*/}
                {/*                            onChange={(e) => setDue(e.target.value)} />*/}
                {/*                    </div>*/}

                {/*                    <div className="row">*/}
                {/*                        <div className="col-6">*/}
                {/*                            <label htmlFor="wd-available-from" className="col-form-label mt-3"><strong>Available from</strong></label>*/}
                {/*                            <div className="input-group mt-1">*/}
                {/*                                <input type="datetime-local" id="wd-available-from" className="form-control" value={formatDate(availableFrom)}*/}
                {/*                                    onChange={(e) => setAvailableFrom(e.target.value)} />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}

                {/*                        <div className="col-6">*/}
                {/*                            <label htmlFor="wd-available-until" className="col-form-label mt-3"><strong>Until</strong></label>*/}
                {/*                            <div className="input-group mt-1">*/}
                {/*                                <input type="datetime-local" id="wd-available-until" className="form-control" value={formatDate(until)}*/}
                {/*                                    onChange={(e) => setUntil(e.target.value)} />*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div><br /><hr /></div>*/}
                {/*        </> :*/}
                {/*        <>*/}
                {/*            <label htmlFor="wd-name" className="col-form-label"><strong>Available From</strong>*/}
                {/*                <span className="ms-4">{formatDate(availableFrom)}</span> </label><br />*/}
                {/*            <label htmlFor="wd-name" className="col-form-label"><strong>Due</strong>*/}
                {/*                <span className="ms-4">{formatDate(due)}</span> </label><br />*/}
                {/*            <label htmlFor="wd-name" className="col-form-label"><strong>Until</strong>*/}
                {/*                <span className="ms-4">{formatDate(until)}</span> </label><hr />*/}
                {/*        </>}*/}

                {/*</div>*/}
                <hr/>
            </form>

            {currentUser.role === "FACULTY" ?
              <>
                  <div className="float-end">
                      <Link to={`/Kanbas/Courses/${cid}/Quizzes`} className="btn btn-light border me-2"
                            onClick={cancelByStatus}>
                          Cancel</Link>
                      <button
                        className="btn btn-danger border"
                        onClick={async () => {
                            await saveByStatus(); // Ensure update completes
                            navigate(`/Kanbas/Courses/${cid}/Quizzes`); // Navigate after update
                        }}
                      >
                          Save
                      </button>
                  </div>
              </> :
              <>
                  <div className="float-end">
                      <Link to={`/Kanbas/Courses/${cid}/Quizzes`} className="btn btn-light border me-2">Go Back</Link>
                      <button onClick={viewLastAttempt} className="btn btn-secondary border me-2">
                          View Last Attempt
                      </button>
                      <Link to="#" onClick={handleAttempt} className="btn btn-danger border">
                          Attempt
                      </Link>
                      {/* <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions/View/${questions.length > 0 && questions[0]._id}`}
                            className="btn btn-danger border" >
                            Attempt
                        </Link> */}
                    </div>
                </>}

        </div>
    );
};