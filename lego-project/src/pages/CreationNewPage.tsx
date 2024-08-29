import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PhotosUploader from "@/components/PhotosUploader";
import Deadpool from "@/assets/deadpool.png";
import MainButton from "@/components/MainButton";
import PreInput from "@/components/PreInput";
import HText from "@/components/HText";

const CreationNewPage = () => {
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [legoFamily,setLegoFamily] = useState('');
    const [rating,setRating] = useState(0);

    const inputStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;

    const handleLoadCreation = async (id) => {
        const getResponse = await fetch(
            "http://localhost:3001/api/creations"+id,
            {
                method: "GET",
                headers: { "Content-Type": "application/json"},
            }
        );
        const getCreation = await getResponse.json();
        const getStatus = getResponse.status;

        const {data} = getCreation;
        setTitle(data.title);
        setAddedPhotos(data.images);
        setDescription(data.description);
        setRating(data.rating);
        setLegoFamily(data.legoFamily);
    }

    useEffect(() => {
        if (!id) {
            return;
        } else {
            handleLoadCreation(id);
        }
    }, [id]);

    const saveCreation = async (e: any) => {
        e.preventDefault();
        const creationData = {
            title,
            addedPhotos: addedPhotos.length > 0 ? addedPhotos : ['uploads/picture.png'],
            description,
            rating,
            legoFamily
        };
        if (id) {
            const updateResponse = await fetch(
                "http://localhost:3001/api/creations",
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json"},
                    body: JSON.stringify({id, ...creationData}),
                }
            );

            const update = await updateResponse.json();
            const updateStatus = update.status;
        } else {
            const createResponse = await fetch(
                "http://localhost:3001/api/creations",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    credentials: 'include',
                    body: JSON.stringify(creationData),
                }
            );
            const create = await createResponse.json();
            const createStatus = createResponse.status;
        }
    }

    return (
        <div className="md:flex">
            <div className="min-h-full w-2/5 py-20 my-20 mx-40">
                <form onSubmit={saveCreation}>
                    <PreInput
                        header={'Title'}
                        description={'Give your work a title'}
                    />
                    <input
                        className={inputStyles}
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="title, for example: My lovely apt"
                    />

                    <PreInput
                        header={'Description'}
                        description={'Describe the assembly process, what inspired your creation, ' +
                            'let your peers know how your creation came about'}
                    />
                    <textarea
                        className={inputStyles}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <PreInput
                        header={'LegoFamily'}
                        description={'Choose which lego family you picked up the item from'}
                    />
                    <select
                        id="countries"
                        className={inputStyles}
                        value={legoFamily}
                        onChange={e => setLegoFamily(e.target.value)}
                    >
                        <option selected>Choose a family</option>
                        <option value="hp">Harry Potter</option>
                        <option value="sw">Star Wars</option>
                        <option value="b">Batman</option>
                    </select>

                    <PreInput
                        header={'Rating'}
                        description={'How others have assessed your work'}
                    />
                    <input
                        className={inputStyles}
                        type="number"
                        value={rating}
                        onChange={e => setRating(e.target.value)}
                    />

                    <PreInput
                        header={'Photos'}
                        description={'Upload pictures of your work, the assembly process'}
                    />
                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

                    <div className="pt-6">
                        <MainButton>
                            Save
                        </MainButton>
                    </div>
                </form>
            </div>

            <div className="items-center justify-between gap-20 md:mt-60 ml-12">
                <div className="mb-40">
                <HText>
                        TELL US WHAT YOU HAVE <span className="text-primary-500">CREATED</span>
                    </HText>
                </div>
                <img
                    className="w-300"
                    alt="creations-page-graphic"
                    src={Deadpool}
                />
            </div>
        </div>
    );
};

export default CreationNewPage;