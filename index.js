const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS condition + failure when modified
app.use(cors());

// Allow the server to receive JSON information.
app.use(express.json());

// Serve files from the static folder.
app.use(express.static(path.join(__dirname, 'static')));

// API 1: Ping (wake-up)
app.get('/api/ping', (req, res) => {
    console.log('Ping API called.');

    res.json({
        message: 'Health Insurance Risk Calculator server is awake!'
    });
});

// API 2: Blood pressure category
app.post('/api/bp-category', (req, res) => {
    console.log('Blood pressure category API called.');

    const bloodPressure = req.body.bloodPressure;

    const validCategories = [
        'normal',
        'elevated',
        'high-stage-1',
        'high-stage-2',
        'crisis'
    ];

    if (!validCategories.includes(bloodPressure)) {
        return res.status(400).json({
            message: 'Please select a valid blood pressure category.'
        });
    }

    console.log('Blood pressure category:', bloodPressure);

    res.json({
        category: bloodPressure
    });
});

// API 3: Body Mass Index (BMI)
app.post('/api/bmi', (req, res) => {
    console.log('BMI API called.');

    const heightFeet = req.body.heightFeet;
    const heightInches = req.body.heightInches;
    const weight = req.body.weight;

    // Validate height and weight.
    if (
        !Number.isInteger(heightFeet) ||
        heightFeet < 3 ||
        heightFeet > 7 ||
        !Number.isInteger(heightInches) ||
        heightInches < 0 ||
        heightInches > 11 ||
        !Number.isInteger(weight) ||
        weight < 1 ||
        weight > 1000
    ) {
        return res.status(400).json({
            message: 'Please provide a valid height and weight.'
        });
    }

    // Convert English units to metric units.
    const totalInches = (heightFeet * 12) + heightInches;
    const heightMeters = totalInches * 0.0254;
    const weightKg = weight * 0.45359237;

    // Calculate BMI.
    const bmi = weightKg / (heightMeters * heightMeters);
	const roundedBmi = Math.round(bmi * 10) / 10;

	let category;

	if (roundedBmi >= 18.5 && roundedBmi < 25.0) {
    	category = 'normal';
	} 
	else if (roundedBmi >= 25.0 && roundedBmi < 30.0) {
	    category = 'overweight';
	} 
	else if (roundedBmi >= 30.0 && roundedBmi < 35.0) {
	    category = 'obese';
	} 
	else {
	    category = 'outside range';
	}

    console.log('BMI calculated:', roundedBmi);
    console.log('BMI category:', category);

    res.json({
        bmi: roundedBmi,
        category: category
    });
});

// API 4: Overall risk category
app.post('/api/risk-category', (req, res) => {
    console.log('Risk category API called.');

    const age = req.body.age;
    const bmiCategory = req.body.bmiCategory;
    const bpCategory = req.body.bpCategory;
    const familyHistory = req.body.familyHistory;

    // Validate age.
    if (
        !Number.isInteger(age) ||
        age < 18 ||
        age > 100
    ) {
        return res.status(400).json({
            message: 'Age must be a whole number between 18 and 100.'
        });
    }

    // Validate BMI category.
    const validBmiCategories = [
        'normal',
        'overweight',
        'obese',
        'outside range'
    ];

    if (!validBmiCategories.includes(bmiCategory)) {
        return res.status(400).json({
            message: 'Please provide a valid BMI category.'
        });
    }

    // Validate blood pressure category using the HTML values.
    const validBpCategories = [
        'normal',
        'elevated',
        'high-stage-1',
        'high-stage-2',
        'crisis'
    ];

    if (!validBpCategories.includes(bpCategory)) {
        return res.status(400).json({
            message: 'Please provide a valid blood pressure category.'
        });
    }

    // Validate family history.
    const validFamilyHistory = [
        'diabetes',
        'cancer',
        'alzheimers'
    ];

    if (
        !Array.isArray(familyHistory) ||
        !familyHistory.every(condition =>
            validFamilyHistory.includes(condition)
        ) ||
        new Set(familyHistory).size !== familyHistory.length
    ) {
        return res.status(400).json({
            message: 'Please provide valid family history selections.'
        });
    }

    let score = 0;

    // Age points.
    if (age < 30) {
        score += 0;
    } else if (age < 45) {
        score += 10;
    } else if (age < 60) {
        score += 20;
    } else {
        score += 30;
    }

    // BMI points.
    if (bmiCategory === 'overweight') {
        score += 30;
    } else if (bmiCategory === 'obese') {
        score += 75;
    }

    // Blood pressure points.
    if (bpCategory === 'elevated') {
        score += 15;
    } else if (bpCategory === 'high-stage-1') {
        score += 30;
    } else if (bpCategory === 'high-stage-2') {
        score += 75;
    } else if (bpCategory === 'crisis') {
        score += 100;
    }

    // Add 10 points for each family history condition.
    score += familyHistory.length * 10;

    // Determine the final risk category.
    let riskCategory;

    if (score <= 20) {
        riskCategory = 'low risk';
    } else if (score <= 50) {
        riskCategory = 'moderate risk';
    } else if (score <= 75) {
        riskCategory = 'high risk';
    } else {
        riskCategory = 'uninsurable';
    }

    console.log('Total risk score:', score);
    console.log('Risk category:', riskCategory);

    res.json({
        score: score,
        category: riskCategory
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});