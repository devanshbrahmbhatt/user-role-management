    const Role = require('../models/roles');

    exports.createRole = async (req, res) => {
        try {
            const role = new Role(req.body);
            await role.save();
            res.status(200).json(role)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }

    exports.updateRole = async (req, res) => {
        try {
            const { roleId, modulesToAdd, modulesToRemove } = req.body;
            const role = await Role.findById(roleId);
            if (!role) {
                return res.status(400).json({ error: "role not found" })
            }
            if (modulesToAdd && Object.keys(modulesToAdd).length) {
                role.accessModules = [...new Set([...role.accessModules, ...modulesToAdd])];
            }
            if (modulesToRemove && Object.keys(modulesToRemove).length) {
                role.accessModules = role.accessModules.filter((module) => !modulesToRemove.includes(module))
            }

            await role.save();
            res.status(200).json(role);

        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
