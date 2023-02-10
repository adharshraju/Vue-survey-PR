//Survey section component

Vue.component('survey-form', {
    props: {
        responses: {
            type: Array
        },
        questions: {
            type: Array
        }
    },
    template: `
    <div> 
        <h1 class="is-size-1  has-text-centered py-6 ">Survey Form</h1>
        <h2 class="is-size-3 my-5">Survey Questions:</h2>
        <form > 
        <!-- @submit.prevent="submitForm" -->
        <div>
            <label class="is-size-5">Name:</label>
            <input class="input mt-3" type="text" v-model="name" placeholder="Enter your name" />       <br><br>
        </div>
        <div v-for="(question, index) in questions" :key="index">
            <p class="is-size-5 my-4">{{ question.text }}</p>
            <label v-for="answer in question.answers">
            <input class="my-2" type="radio" :value="answer" v-model="selectedAnswers[index]"/>
            {{ answer }} <br>
            </label>
        </div>
        
        <button class="button is-medium my-6"  type="submit" @click="validateForm" :disabled="!name">
            Submit
        </button>
        </form>
    </div>`,
    data()
    {
        return {
            name: "",
            selectedAnswers: []

        }
    },
    methods: {
        validateForm(event)
        {
            event.preventDefault();
            if (this.selectedAnswers.length < this.questions.length) {
                alert("All questions must be answered!");
                return;
            }
            this.submitForm();
        },
        submitForm()
        {
            alert("Form submitted!");
            this.responses.push({
                name: this.name,
                answers: this.selectedAnswers
            });

            // console.log(this.frequency);
            console.log(this.responses);

            this.name = "";
            this.selectedAnswers = [];
        },
    }
})

//Report section component

Vue.component('report-section', {
    props: {
        responses: {
            type: Array
        },
        questions: {
            type: Array
        }
    },
    template: `
    <div>
        <h4 class="is-size-1 has-text-centered py-6">Report</h4>
        <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                    <th class="is-size-5 px-6">Name</th>
                    <th class="is-size-5" v-for="question in questions">{{ question.text }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="response in responses">
                    <td>{{ response.name }}</td>
                    <td v-for="answer in response.answers">{{ answer }}</td>
                </tr>
            </tbody>
        </table>
        <br>

        <!-- Popular answers -->
        <div class="has-text-centered py-6 mt-6 is-size-4">
            <h4 class="is-size-1 has-text-centered py-6">Most popular answers</h4>
            <table class="table is-fullwidth is-striped is-hoverable is-bordered is-narrow">
            <thead>
                <tr>
                    <th class="is-size-5 px-6">Question</th>
                    <th class="is-size-5 px-6">Popular answer</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(question, index) in questions">
                    <td>{{ question.text }}</td>
                    <td>{{ findMostPopularAnswer(index) }}</td>
                </tr>
            </tbody>
        </table>


        </div>
        <br>
    </div>`,
    methods: {
        findMostPopularAnswer(questionIndex)
        {
            const answerCounts = {};
            this.responses.forEach(response =>
            {
                const answer = response.answers[questionIndex];
                if (!answerCounts[answer]) {
                    answerCounts[answer] = 0;
                }
                answerCounts[answer]++;
            });
            return Object.entries(answerCounts).reduce(
                (a, b) => (b[1] > a[1] ? b : a)
            )[0];
        }
    }
})



//Main component
var survey = new Vue({
    el: '#survey',
    data: {
        questions: [
            {
                text: "What is your favorite color?",
                answers: ["Red", "Blue", "Green"]
            },
            {
                text: "What is your favorite food?",
                answers: ["Pizza", "Sushi", "Steak"]
            },
            {
                text: "What is your favorite animal?",
                answers: ["Dog", "Cat", "Bird"]
            }
        ],
        showReport: false,
        responses: []

    }
})