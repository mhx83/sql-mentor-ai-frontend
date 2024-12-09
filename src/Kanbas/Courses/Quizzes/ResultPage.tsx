// // import { useLocation, useNavigate } from "react-router";
// // import React from "react";

// // const ResultPage = () => {
// //     const location = useLocation();
// //     const navigate = useNavigate();

// //     // 获取通过 state 传递的数据
// //     const { score, totalQuestions, results } = location.state || {};

// //     // 如果没有结果数据，跳回到测验列表
// //     if (!results) {
// //         navigate(-1); // 返回上一页
// //         return null;
// //     }

// //     return (
// //         <div>
// //             <h1>Quiz Results</h1>
// //             <p>
// //                 <strong>Score:</strong> {score} / {totalQuestions}
// //             </p>

// //             <table className="table table-bordered">
// //                 <thead>
// //                     <tr>
// //                         <th>Question #</th>
// //                         <th>Your Answer</th>
// //                         <th>Correct Answer</th>
// //                         <th>Status</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {results.map((result: any, index: number) => (
// //                         <tr key={result.questionId}>
// //                             <td>{index + 1}</td>
// //                             <td>{result.userAnswer || "No Answer"}</td>
// //                             <td>
// //                                 {Array.isArray(result.correctAnswer)
// //                                     ? result.correctAnswer.join(", ")
// //                                     : result.correctAnswer}
// //                             </td>
// //                             <td>
// //                                 {result.isCorrect ? (
// //                                     <span style={{ color: "green" }}>✔</span>
// //                                 ) : (
// //                                     <span style={{ color: "red" }}>✘</span>
// //                                 )}
// //                             </td>
// //                         </tr>
// //                     ))}
// //                 </tbody>
// //             </table>

// //             <button className="btn btn-primary" onClick={() => navigate(-1)}>
// //                 Back to Quizzes
// //             </button>
// //         </div>
// //     );
// // };

// // export default ResultPage;

// import { useLocation, useNavigate } from "react-router-dom";
// import React from "react";

// const ResultPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     // 从跳转时传递的 state 中获取数据
//     const { score, totalQuestions, results } = location.state || {};

//     // 如果没有结果数据，返回上一页
//     if (!results) {
//         return (
//             <div>
//                 <h1>No Results Found</h1>
//                 <button className="btn btn-secondary" onClick={() => navigate(-1)}>
//                     Back to Quizzes
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <h1>Quiz Results</h1>
//             <p>
//                 <strong>Score:</strong> {score} / {totalQuestions}
//             </p>

//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th>Question #</th>
//                         <th>Your Answer</th>
//                         <th>Correct Answer</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {results.map((result: any, index: number) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{result.userAnswer || "No Answer"}</td>
//                             <td>
//                                 {Array.isArray(result.correctAnswer)
//                                     ? result.correctAnswer.join(", ")
//                                     : result.correctAnswer}
//                             </td>
//                             <td>
//                                 {result.isCorrect ? (
//                                     <span style={{ color: "green" }}>✔</span>
//                                 ) : (
//                                     <span style={{ color: "red" }}>✘</span>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <button className="btn btn-primary" onClick={() => navigate(-1)}>
//                 Back to Quizzes
//             </button>
//         </div>
//     );
// };

// export default ResultPage;


import { useLocation, useNavigate, useParams } from "react-router-dom";

import React from "react";

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cid } = useParams();

    // 获取通过 state 传递的数据
    const { score, totalPoints, results } = location.state || {};

    // 如果没有结果数据，跳回到测验列表
    if (!results) {
        navigate(-1); // 返回上一页
        return null;
    }

    // 添加调试信息
    console.log("Score:", score);
    console.log("Total Points:", totalPoints);
    console.log("Results:", results);

    return (
        <div>
            <h1>Quiz Results</h1>
            <p>
                <strong>Score:</strong> {score} / {totalPoints}
            </p>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Question #</th>
                        <th>Your Answer</th>
                        <th>Correct Answer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((result:any, index:any) => (
                        <tr key={result.questionId || index}>
                            <td>{index + 1}</td>
                            <td>{result.userAnswer || "No Answer"}</td>
                            <td>
                                {(result.possibleAnswers.length > 0)
                                    ? result.possibleAnswers.join(", ")
                                    : result.correctAnswer}
                            </td>
                            <td>
                                {result.isCorrect ? (
                                    <span style={{ color: "green" }}>✔</span>
                                ) : (
                                    <span style={{ color: "red" }}>✘</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="btn btn-primary" 
                onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>
                Back to Quizzes
            </button>
        </div>
    );
};

export default ResultPage;
