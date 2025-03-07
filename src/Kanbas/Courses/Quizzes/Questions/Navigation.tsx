import { Link, useLocation, useParams } from "react-router-dom";

export default function QuestionsNavigation({ questions }: { questions: any[] }) {

    const { qid, qaid } = useParams();
    const { pathname } = useLocation();
    const basepath = pathname.substring(0, pathname.lastIndexOf("/"));

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">

            {questions.length > 0 && questions.map((question, index) => (
                <Link key={index} to={`${basepath}/${question._id}`} className={`list-group-item border border-0
           ${qaid === String(question._id) ? "active" : "text-danger"}`} >
                    <span style={{ whiteSpace: 'nowrap' }}>Question {index + 1}</span> </Link>
            )
            )}

        </div>
    );
}