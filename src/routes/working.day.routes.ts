import { Router } from 'express';
import { validateFields } from '../middlewares';
import { WorkingDayController } from '../controllers';
import { WorkingDayValidator } from '../validators';

const router = Router();
const workingDayValidator = new WorkingDayValidator();
const workingDayController = new WorkingDayController();

router.get('/', workingDayController.all);
router.get('/:id', workingDayController.one);
router.post(
    '/',
    workingDayValidator.validateWorkingDay,
    validateFields,
    workingDayController.create
);
router.put(
    '/:id',
    workingDayValidator.validateWorkingDay,
    workingDayValidator.validateWorkingDayId,
    validateFields,
    workingDayController.update
);
router.delete('/:id', workingDayController.delete);

export default router;