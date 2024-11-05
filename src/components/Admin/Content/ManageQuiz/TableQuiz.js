const TableQuiz = ({ listQuizzes, handleClickBtnUpdate, handleClickBtnDelete }) => {
    console.log(listQuizzes)
    return (
        <>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Difficulty</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuizzes && listQuizzes.length > 0 ? (
                        listQuizzes.map((quiz, index) => (
                            <tr key={quiz.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{quiz.name}</td>
                                <td>{quiz.description}</td>
                                <td>{quiz.difficulty}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => { handleClickBtnUpdate(quiz) }}>Edit</button>
                                    <button className="btn btn-danger mx-2" onClick={() => { handleClickBtnDelete(quiz) }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No quizzes available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default TableQuiz;
