import { faker } from '@faker-js/faker'

export function generateRandomPieChart() {
    const title = faker.lorem.words(2)
    const value = Array.from(
        { length: faker.datatype.number({ min: 3, max: 6 }) },
        () => ({
            label: faker.lorem.word(),
            value: faker.datatype.number({ min: 10, max: 1000 }),
        }),
    )

    return { title, value }
}

export function generateRandomPieChartData() {
    return generateRandomPieChart()
}
