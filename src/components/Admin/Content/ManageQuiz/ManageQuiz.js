import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import "./ManageQuiz.scss";
import { getAllQuiz, postCreateNewQuiz } from '../../../../service/quizService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import UpdateQuizModal from './UpdateQuizModal';
import DeleteQuizModal from './DeleteQuizModal';
import { Accordion } from 'react-bootstrap';

const ManageQuiz = () => {
    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ];

    const [previewImage, setPreviewImage] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [image, setImage] = useState("");
    const [listQuizzes, setListQuizzes] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);

    const fetchQuizzes = async () => {
        let response = await getAllQuiz();
        if (response.EC === 0) {
            setListQuizzes(response.DT);
        }
    };

    const handleClickBtnUpdate = (quiz) => {
        setShowModalUpdate(true);
        setDataUpdate(quiz);
    };

    const handleClickBtnDelete = (quiz) => {
        setShowDelete(true);
        setDataUpdate(quiz);
    };

    useEffect(() => {
        fetchQuizzes()
    }, []);

    const resetDataUpdate = () => {
        setDataUpdate([]);
    }

    const handleUploadImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (validImageTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(URL.createObjectURL(file));
                    setImage(file);
                };
                reader.readAsDataURL(file);
                console.log(previewImage, " ", image)
            } else {
                setPreviewImage(null); // Clear previous preview
            }
        }
    };

    const handleSaveNewQuiz = async () => {
        if (!name) {
            toast.error("Please enter a name");
            return;
        }

        if (!description) {
            toast.error("Please enter a description");
            return;
        }

        if (!difficulty) {
            toast.error("Please choose difficulty");
            return;
        }

        let response = await postCreateNewQuiz(name, description, difficulty, image);
        if (response && response.EC === 0) {
            toast.success("Added new quiz successfully");
            setName("");
            setDescription("");
            setDifficulty("");
            setImage(null);
            setPreviewImage(null);
            fetchQuizzes();
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    return (
        <div className="manage-quiz-container">
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new-quiz">
                            <fieldset className="border rounded-3 p-3 row g-3 gap-1">
                                <legend className="float-none w-auto px-3 fs-4">Add new quiz</legend>
                                <div className="form-floating mb-3 col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingName"
                                        placeholder="name@example.com"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)} />
                                    <label htmlFor="floatingName">Name</label>
                                </div>
                                <div className="form-floating col-md-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingDescription"
                                        placeholder="Description"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)} />
                                    <label htmlFor="floatingDescription">Description</label>
                                </div>

                                <div className='other row g-3' style={{ width: '50%' }}>
                                    <div className="col-md-7">
                                        <label htmlFor="selectDifficulty">Difficulty</label>
                                        <Select
                                            onChange={(selectedOption) => setDifficulty(selectedOption.value)}
                                            options={options}
                                            value={options.find(option => option.value === difficulty)}
                                            id="selectDifficulty"
                                        />
                                    </div>

                                    <div className="col-md-7">
                                        <label htmlFor="inputImage" className="form-label">Image</label>
                                        <input type="file" className="form-control" id="inputImage" onChange={handleUploadImage} />
                                    </div>
                                </div>



                                {/* Image Preview */}
                                <div className="col-md-12 card img-preview">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="img-fluid" />
                                    ) : (
                                        <span>Preview image</span>
                                    )}
                                </div>

                                <button className='btn btn-primary' onClick={() => handleSaveNewQuiz()}>Save</button>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className='listQuiz mt-3 px-3'>
                <div className="mb-3 fs-4">List Quizzes</div>
                <TableQuiz
                    listQuizzes={listQuizzes}
                    handleClickBtnDelete={handleClickBtnDelete}
                    handleClickBtnUpdate={handleClickBtnUpdate}
                />
                <UpdateQuizModal
                    dataUpdate={dataUpdate}
                    showModalUpdate={showModalUpdate}
                    setShowModalUpdate={setShowModalUpdate}
                    fetchQuizzes={fetchQuizzes}
                    resetDataUpdate={resetDataUpdate}
                />
                <DeleteQuizModal
                    dataUpdate={dataUpdate}
                    fetchQuizzes={fetchQuizzes}
                    showDelete={showDelete}
                    setShowDelete={setShowDelete}
                    resetDataUpdate={resetDataUpdate}
                />
            </div>

        </div>
    );
}

export default ManageQuiz;
