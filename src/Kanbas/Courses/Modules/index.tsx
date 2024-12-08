import React, { useState, useEffect} from "react";
import ModulesControls from "./ModuleControls";
import { BsGripVertical } from 'react-icons/bs'
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {

    const { cid } = useParams();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
    const [moduleName, setModuleName] = useState("");
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchModules = async () => {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    };
    useEffect(() => {
      fetchModules();
    }, []);

    const createModuleForCourse = async () => {
      if (!cid) return;
      const newModule = { name: moduleName, course: cid };
      const module = await coursesClient.createModuleForCourse(cid, newModule);
      dispatch(addModule(module));
    };

    const removeModule = async (moduleId: string) => {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    };

    const saveModule = async (module: any) => {
      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    };

    return (
      <div>
        {currentUser.role === "FACULTY" ?
        <div>
          <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={createModuleForCourse} />
          <br /><br /><br /><br />
        </div> : 
        <div id="wd-modules-controls" className="text-nowrap">
            <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-4 float-end">
            Collapse All</button><br /><br /><br /><br />
        </div>
        }

        <ul id="wd-modules" className="list-group rounded-0 ms-4 me-4">
          {modules.map((module: any)=> (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
              <strong>{!module.editing && module.name}</strong>
              { module.editing && (
                <input className="form-control w-50 d-inline-block"
                      onChange={(e) => dispatch(
                        updateModule({ ...module, name: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}/>
              )}{currentUser.role === "FACULTY" &&
                  <ModuleControlButtons moduleId={module._id}
                  deleteModule={(moduleId) => removeModule(moduleId)} 
                  editModule={(moduleId) => dispatch(editModule(moduleId))} />
              }</div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any)=> (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name} {currentUser.role === "FACULTY" && <LessonControlButtons />} </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
  );
}