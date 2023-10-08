import * as Yup from 'yup';

export const Form_Validation = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    license: Yup.string()
    .required('License Number is required')
    .matches(/^[A-Z]{2,3}-\d{4}$/, 'Invalid License Number Format (e.g., AB-1234)'),

    model: Yup.string().required('Model and Make is required'),
    location: Yup.string().required('Location is required')
    .matches(/^[A-Za-z0-9\s]+$/, 'Invalid input Characters'),
    year: Yup.number()
        .integer('Year must be an integer')
        .min(1990, 'Year must be greater than or equal to 1990')
        .max(2024, 'Year must be less than or equal to 2024')
        .required('Year is required'),
    mileage: Yup.number()
        .integer('Mileage must be an integer')
        .min(0, 'Mileage must be greater than or equal to 0')
        .max(500000, 'Mileage must be less than or equal to 500,000')
        .required('Mileage is required'),
    transmission: Yup.string().oneOf(['Auto', 'Manual'], 'Invalid Transmission').required('Transmission type is required'),
    fuel: Yup.number()
        .min(0, 'Fuel Capacity must be greater than or equal to 0')
        .max(500, 'Fuel Capacity must be less than or equal to 500')
        .required('Fuel Capacity is required'),
        price: Yup.number()
        .integer('Price must be an integer')
        .min(400, 'Price must be at least Rs.200')
        .max(5000, 'Price cannot exceed Rs.5,000')
        .required('Price is required'),
    description: Yup.string(),


    seat: Yup.number()
        .integer('Number of Seats must be an integer')
        .min(0, 'Number of Seats must be greater than or equal to 0')
        .max(100, 'Number of Seats must be less than or equal to 100')
        .required('Seat count is required'),

    photos: Yup.array().test('at-least-one-photo', 'At least one photo is required', function (value) {
        return value && value.length > 0;
    }),
});
