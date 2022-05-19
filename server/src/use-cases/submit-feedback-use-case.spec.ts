import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy },
)

describe('Submit Feedback', () => {
    it('Should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example Comment',
            screenshot: 'data:image/png;base64,5474asf7sa4fa847'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toBeCalled();
        expect(sendMailSpy).toBeCalled();
    });

    it('Should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example Comment',
            screenshot: 'data:image/png;base64,5474asf7sa4fa847'
        })).rejects.toThrow()
    });

    it('Should not be able to submit a feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,5474asf7sa4fa847'
        })).rejects.toThrow()
    });

    it('Should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example Comment',
            screenshot: '123.jpg'
        })).rejects.toThrow()
    });
});
