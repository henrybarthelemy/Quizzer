import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Title from '../components/title';
  
const Quiz = ({navigation}) => {
    const AMOUNT_OF_QUESTIONS = 10;
    const [questions, setQuestions] = useState();
    const [quesIdx, setQuesIdx] = useState(0);
    const [option, setOption] = useState([])
    const [selectedIndex, setSelectedIndex] = useState()
    const [numberCorrect, setNumberCorrect] = useState(0)

    const getQuiz = async () => {
        const url= 'https://opentdb.com/api.php?amount=' + AMOUNT_OF_QUESTIONS + '&type=multiple&encode=url3986';
        const response = await fetch(url);
        const data = await response.json();
        setQuestions(data.results)
        setOption(generateOptionsAndShuffle(data.results[0]));
    };
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    useEffect(() => {
        getQuiz();
    },[])

    const handleNextPress = () => {
        if (isCorrect()) {
            setNumberCorrect(numberCorrect + 1);
        }
        setQuesIdx(quesIdx + 1);
        setSelectedIndex(null);
        setOption(generateOptionsAndShuffle(questions[quesIdx + 1]));
        console.log(numberCorrect);
    }

    const handleSkip = () => {
        if (quesIdx < AMOUNT_OF_QUESTIONS - 1) {
            setQuesIdx(quesIdx + 1);
            setSelectedIndex(null);
            setOption(generateOptionsAndShuffle(questions[quesIdx + 1]));
        } else {
            onShowResults();
        }
    }

    const onShowResults = () => {
        const finalNumberCorrect = numberCorrect + (isCorrect() ? 1 : 0);
        console.log(finalNumberCorrect);
        navigation.navigate('Result', {
            numCorrect: finalNumberCorrect, 
            total: AMOUNT_OF_QUESTIONS});
    }

    const isCorrect = () => {
        console.log(option[selectedIndex])
        console.log(questions[quesIdx].correct_answer)
        return selectedIndex == null ? false : option[selectedIndex] == questions[quesIdx].correct_answer;
    }

    const generateOptionsAndShuffle = (_question) => {
        const options = [_question.correct_answer,..._question.incorrect_answers]
        shuffleArray(options)
        return options;
    }

    
    return(
        <View style={styles.container}>
            
            {questions && 
            <>
            <View style={styles.top}>
                <View style={{ flexDirection: "row", backgroundColor: "lightgray", borderRadius: 4, overflow: 'hidden',  }}>
                    <View style={{ flex: quesIdx / AMOUNT_OF_QUESTIONS, height: 30, backgroundColor: "#1A759F" }} />
                    <View style={{ flex: 1 - (quesIdx / AMOUNT_OF_QUESTIONS) }} />
                </View>
            </View>
            <View style={styles.middle}>
                <Text style={styles.questionText}>Q. {decodeURIComponent(questions[quesIdx].question)}</Text>
            </View>
            <View style={styles.options}>
                {option.map((optionText, index) => {
                    return(
                    <TouchableOpacity key={index} style={selectedIndex == index ? styles.selectedOptionButton : styles.optionButton} onPress={() => setSelectedIndex(index)}>
                        <Text style={styles.optionText}>{decodeURIComponent(optionText)}</Text>
                    </TouchableOpacity>)
                })}
                
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.button} onPress={handleSkip}>
                    <Text style={styles.buttonText}>SKIP</Text>
                </TouchableOpacity>
                {quesIdx < AMOUNT_OF_QUESTIONS - 1 ?
                <TouchableOpacity style={selectedIndex == null ? styles.disabledbutton : styles.button} disabled={selectedIndex == null} onPress={handleNextPress}>
                <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity> : 

            <TouchableOpacity style={selectedIndex == null ? styles.disabledbutton : styles.button} disabled={selectedIndex == null} onPress={() => onShowResults()}>
            <Text style={styles.buttonText}>SHOW RESULTS</Text>
        </TouchableOpacity>
            }
                
                
            </View>
            </>
            }
        </View>
    )
};

export default Quiz;

const styles = StyleSheet.create({
    questionText: {
        fontSize: 25,

    },
    optionButton: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginVertical: 6,
        backgroundColor: '#34A0A4',
        borderRadius: 12
    },
    selectedOptionButton: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginVertical: 6,
        backgroundColor: '#195051',
        borderRadius: 12
    },
    optionText: {
        fontSize: 15,
        color: 'white'
    },
    container: {
        padding: 12,
        marginTop: 40,
        height: '100%'
    },
    top: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    middle: {
        
    }, 
    progressBar: {
        width: '100%'
    },
    options: {
        marginVertical: 16,
        flex: 1
    },
    bottom: {
        marginButtom: 12,
        paddingVertical: 16,
        marginHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: "#1A759F",
        padding: 12,
        paddingHorizontal: 25,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 70
    },
    disabledbutton: {
        backgroundColor: "#D3D3D3",
        padding: 12,
        paddingHorizontal: 25,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 70
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    }
});
