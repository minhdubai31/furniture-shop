import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faMagnifyingGlass,
	faMicrophone,
	faCircle,
} from '@fortawesome/free-solid-svg-icons';
import useSpeechToText from 'react-hook-speech-to-text';
import soundStartRecording from './audio/start_recording.mp3';
import soundStopRecorded from './audio/stop_recorded.mp3';

function SearchBar() {
	const {
		interimResult,
		isRecording,
		results,
		setResults,
		startSpeechToText,
		stopSpeechToText,
	} = useSpeechToText({
		continuous: false,
		crossBrowser: true,
		googleApiKey: process.env.REACT_APP_GOOGLE_SPEECH_TO_TEXT_API_KEY,
		useLegacyResults: false,
		speechRecognitionProperties: {
			lang: 'vi-VN',
			interimResults: true, // Allows for displaying real-time speech results
		},
	});

	const microphone = useRef();
	const behindMicrophone = useRef();
	const audioStartRecording = new Audio(soundStartRecording);
	const audioStopRecorded = new Audio(soundStopRecorded);

	useEffect(() => {
		microphone.current.classList.toggle('text-white/50');
		behindMicrophone.current.classList.toggle('bg-white/25');
		behindMicrophone.current.classList.toggle('animate-ping');

		if (!isRecording) {
			if (results.length > 0) {
				setResults(results.pop().transcript);
				audioStopRecorded.play();
			}
		} else {
			setResults('');
			audioStartRecording.play();
		}
	}, [isRecording]);

	return (
		<div className="h-12 w-[300px] max-w-full px-4 rounded-md text-white bg-white/10 flex items-center justify-between">
			<input
				className="w-full h-12 bg-transparent placeholder:text-white/50 !outline-none"
				type="text"
				placeholder={interimResult ? interimResult : 'Tìm kiếm'}
				onChange={(e) => setResults(e.target.value)}
				value={
					typeof results != 'object'
						? results
						: results[0]
						? results[0].transcript
						: ''
				}
			/>
			<div
				ref={microphone}
				className="mx-2 text-white/50 relative flex justify-center items-center"
			>
				<button
					onClick={isRecording ? stopSpeechToText : startSpeechToText}
				>
					<FontAwesomeIcon icon={faMicrophone} />
				</button>
				<span
					ref={behindMicrophone}
					className="absolute inline-flex -z-10 h-5 w-5 rounded-full bg-transparent"
				></span>
			</div>
			<div className="ms-2 text-white/50">
				<FontAwesomeIcon icon={faMagnifyingGlass} />
			</div>
		</div>
	);
}

export default SearchBar;
