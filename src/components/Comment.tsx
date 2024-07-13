

export default function Comment(){
    return (
        <div className="mt-5  flex flex-col border-1 shadow-lg  rounded-lg shadow-lg">
            <span className="font-bold text-2xl mx-5 py-5">Comment</span>
            <div id="comment" className="flex flex-col mx-5 p-2 ring-1 ring-gray-400 rounded-lg shadow-lg">
                <div id="header" className="flex flex-row">
                    <div >
                        Username
                    </div>
                    <div>
                        thời gian
                    </div>
                </div>
                <div>Content</div>
                <div>
                    footer
                </div>
            </div>
        </div>
    )
}