
import React, { useMemo } from "react";
import styled from "styled-components";
import FileDownloadIcon ,{IFileDownloadIconProps} from "../FileDownloadIcon";
import FileTypeIcon from "../FileTypeIcon";

const FileItemWrap = styled.div`
  display: flex;
  align-items: center;
`;

const FileNameText = styled.div<{isActive:boolean}>`
  margin-left: 4px;
  margin-right: 16px;
  line-height: 20px;
  font-size: 14px;

  font-weight: 400;
  color: ${props=>props.isActive?'rgba(22, 119, 255, 1)':'rgba(0, 0, 0, 0.55)'};
  cursor:  ${props=>props.isActive?'pointer':'default'};
`;

export interface IFileItemProps extends IFileDownloadIconProps{
    /**
   * 文件名称
   * @description       文件名称
   */
  fileName: string;
  /**
   * 文件链接,预览用
   * @description       文件链接
   */
  fileSrcUrl: string;
  /**
   * isActive 强制指定是否可预览
   *  @description       强制指定是否可预览(为空时候根据文件名判断)
   *
   *
   */
  isActive?: boolean;
 
}

function getTypeIsActive(fileType: string) {
    return ['pdf', 'mp4', 'jpg'].includes(fileType);
  }

export function FileItem(props:Partial<IFileItemProps>){
    const { isActive ,...rest} = props;
    const fileTypeMemo = useMemo(()=>{
        if(!props.fileName){
            return ''
        } 
        const fileType = props.fileName.split('.').pop();

        if(!fileType||!fileType.toLowerCase){
            return ''
        }
        return  fileType.toLowerCase();
    },[props.fileName])
    const isActiveMemo = useMemo(()=>{
        if(isActive!==undefined){
            return !!isActive
        }
        if(!fileTypeMemo){
            return false
        }

        return ['pdf', 'mp4', 'jpg'].includes(fileTypeMemo)
       
    },[isActive,props.fileName])
    return <FileItemWrap>

         <FileTypeIcon fileName={props.fileName} {...rest} />
                <FileNameText isActive={isActiveMemo} onClick={(e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                    if(isActiveMemo&&props.fileSrcUrl){
                        window.open(props.fileSrcUrl)
                    }
                }}>{props.fileName}</FileNameText>
                <FileDownloadIcon  {...rest} />
    </FileItemWrap>
}