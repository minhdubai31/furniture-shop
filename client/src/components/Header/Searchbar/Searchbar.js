import { useEffect, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMagnifyingGlass,
	faMicrophone,
} from '@fortawesome/free-solid-svg-icons';

import SpeechRecognition, {
	useSpeechRecognition,
} from 'react-speech-recognition';

import soundStartRecording from './audio/start_recording.mp3';
import soundStopRecorded from './audio/stop_recorded.mp3';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
	// Use web speech api
	const { transcript, finalTranscript, listening } = useSpeechRecognition();

	// Configure the speech recognition language
	const startListening = () =>
		SpeechRecognition.startListening({ language: 'vi' });
	const stopListening = () => SpeechRecognition.stopListening();

	// Search input
	const [searchInput, setSearchInput] = useState('');
	const [firstRender, setFirstRender] = useState(true);

	const navigate = useNavigate();

	const microphone = useRef();
	const behindMicrophone = useRef();
	const audioStartRecording = new Audio(soundStartRecording);
	const audioStopRecorded = new Audio(soundStopRecorded);

	const searchHandler = (searchContent) => {
		if (searchContent.length > 0) navigate('/search?text=' + searchContent);
		setSearchInput('');
	};

	useEffect(() => {
		const addMicrophoneAnimation = () => {
			microphone.current.classList.add('!text-white');
			behindMicrophone.current.classList.add('bg-white/25');
			behindMicrophone.current.classList.add('animate-ping');
		};

		const removeMicrophoneAnimation = () => {
			microphone.current.classList.remove('!text-white');
			behindMicrophone.current.classList.remove('bg-white/25');
			behindMicrophone.current.classList.remove('animate-ping');
		};

		if (!listening) {
			removeMicrophoneAnimation();
			if (!firstRender) {
				setSearchInput(finalTranscript);
				audioStopRecorded.play();
				searchHandler(finalTranscript);
			}
		} else {
			addMicrophoneAnimation();
			setSearchInput('');
			audioStartRecording.play();
		}

		setFirstRender(false);
	}, [listening]);

	return (
		<div className="h-12 w-[300px] max-w-full px-4 rounded-md text-white bg-white/10 flex items-center justify-between">
			<input
				className="w-full h-12 bg-transparent placeholder:text-white/50 !outline-none"
				type="text"
				placeholder={
					listening
						? transcript
							? transcript
							: 'Tìm kiếm'
						: 'Tìm kiếm'
				}
				onChange={(e) => setSearchInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key == 'Enter') searchHandler(searchInput);
				}}
				value={searchInput}
			/>
			<div
				ref={microphone}
				className="mx-2 text-white/50 cursor-pointer hover:text-white relative flex justify-center items-center"
			>
				<button onClick={listening ? stopListening : startListening}>
					<FontAwesomeIcon icon={faMicrophone} />
				</button>
				<span
					ref={behindMicrophone}
					className="absolute inline-flex -z-10 h-5 w-5 rounded-full bg-transparent"
				></span>
			</div>
			<div
				className="ms-2 text-white/50 cursor-pointer hover:text-white"
				onClick={(e) => searchHandler(searchInput)}
			>
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</div>
		</div>
	);
}

export default SearchBar;
